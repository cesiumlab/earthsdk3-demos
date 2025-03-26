<template>
    <DraggablePopup2 :title="'3dtiles服务合并工具'" :width="800" :height="'400px'" :left="300" :top="100" @close="close">
        <div class="mergemodel">
            <div class="mergemodel_top">
                <div class="mergemodel_list">
                    <div class="mergemodel_list_head">
                        <div class="mergemodel_list_head_index">序号</div>
                        <div class="mergemodel_list_head_url">服务地址</div>
                        <div class="mergemodel_list_head_change"><span style="cursor:pointer;" @click.stop="addModelUrl"
                                title="添加服务地址" @mouseenter="hoverliIndex = true"
                                @mouseleave="hoverliIndex = false"><es-icon :name="'tianjia'"
                                    :color="hoverliIndex ? '#fff' : '#575B66'" :size="13" /></span></div>
                    </div>
                    <div class="mergemodel_list_data">
                        <div class="mergemodel_list_data_input" v-for="(item, index) in modelListsData ">
                            <div class="mergemodel_list_head_index">{{ index + 1 }}</div>
                            <div class="mergemodel_list_head_url"><input type="text" :value="item"
                                    @input="changeValue($event, index)"></div>

                            <div class="mergemodel_list_head_change"><span style="cursor:pointer;"
                                    @click.stop="deleteModelUrl(index)" title="删除服务地址"
                                    @mouseenter="hoverlideleteIndex = index"
                                    @mouseleave="hoverlideleteIndex = -2"><es-icon :name="'shanchu_2'"
                                        :color="hoverlideleteIndex === index ? '#fff' : '#575B66'" :size="13" /></span>
                            </div>
                            <div class="mergemodel_list_head_tip" :title="getTipMessage(index)">{{ getTipMessage(index)
                                }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe :src="iframeSrc" frameborder="0" @load="loadIframe" ref="mainIframe"
                        style="width:100%; height:100%;cursor: not-allowed"></iframe>
                </div>
            </div>
            <div class="mergemodel_bottom">
                <button @click="generate">生成</button>
                <button @click="copy">复制</button>
                <button @click="download">下载</button>
            </div>

        </div>

    </DraggablePopup2>
</template>
<script setup lang="ts">
import { FileHandleType, getSaveFileHandle, Message, messageBox, saveFile } from "earthsdk-ui";
import { merge3dTilesServer } from "earthsdk3-cesium";
import { inject, ref } from 'vue';
import DraggablePopup2 from "../../../components/DraggablePopup2.vue";
import { copyClipboard } from "../../../components/eSPropPanel/propertiesMenu/commons/base/copyClipboard";
const emits = defineEmits(['close']);
const close = () => {
    emits("close")
}
const hoverlideleteIndex = ref(-2)
const hoverliIndex = ref(false)
const modelListsData = ref<any[]>(['', ''])
const tipListsData = ref<any[]>([])

const iframeSrc = './monaco-editor/json-editor.html';
const changeValue = (event: any, index: number) => {
    tipListsData.value = []
    const v = event.target.value
    modelListsData.value[index] = v
}
const addModelUrl = () => {
    tipListsData.value = []
    modelListsData.value.push('')
}
const deleteModelUrl = (index: number) => {
    tipListsData.value = []
    messageBox({ text: '确认删除这一个服务地址吗？' })
        .then(() => {
            modelListsData.value.splice(index, 1)
        })
        .catch((err) => {
        })
}
const getTipMessage = (index: number) => {
    let info = ''
    tipListsData.value.forEach((item) => {
        if (index === item.index) {
            info = item.message
            return
        }
    })
    return info
}
const generate = () => {//生成
    if (modelListsData.value.length < 2) {
        Message.error('请填入至少两个服务地址')
        return
    }
    let a = 0
    modelListsData.value.forEach(item => {
        if (item === '') {
            a++
        }
    })
    if (a > 0) {
        Message.error('服务地址不能为空')
        return
    }
    merge3dTilesServer(modelListsData.value).then(async res => {
        if (res.state === 'success') {
            if (res.tilesUrl) {
                tipListsData.value = []
                Message.success('生成成功')
                await setJson(JSON.stringify(res.tilesUrl, undefined, '    '))
            }
        } else {
            if (res.info) {
                tipListsData.value = res.info
            }
            if (res.tilesUrl) {
                await setJson(JSON.stringify(res.tilesUrl, undefined, '    '))
            } else {
                await setJson(JSON.stringify('', undefined, '    '))
            }
            Message.error('存在错误服务，请检查')
            return
        }
    }).catch(error => {
        Message.error(error)
        console.log('error', error);

    })
}
const copy = async () => {//复制
    try {
        const str = await getJson()
        copyClipboard(str)
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！ error: ${error}`);
        return
    }

}
const download = async () => {//下载
    try {
        const str = await getJson()
        const json = JSON.parse(str);
        saveAs(json, 'tileset');
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！ error: ${error}`);
    }
}
const mergeModelData = ref()
const mainIframe = ref<HTMLIFrameElement>();//json对应的元素

//json编辑器初始化
const loadIframe = async () => {
    await setJson(JSON.stringify(mergeModelData.value, undefined, '    '))
}
function setJson(value: string) {//设置json
    return new Promise<void>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const setKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'setJson', id: setKey, value })
        const time = setTimeout(() => {
            removeEventListener('message', messageSetEventWatch, false);
            reject();
        }, 10000);

        const messageSetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'setJsonReturn') || (data.id && data.id !== setKey)) {
                return;
            }
            removeEventListener('message', messageSetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok') {
                resolve();
            } else {
                reject();
            }
        }
        addEventListener('message', messageSetEventWatch, false);
    })
}
function getJson() {//获取json上面的内容
    return new Promise<string>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const getKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'getJson', id: getKey })
        const time = setTimeout(() => {
            removeEventListener('message', messageGetEventWatch, false);
            reject();
        }, 10000);

        const messageGetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string, value: string | undefined } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'getJsonReturn') || (data.id && data.id !== getKey)) {
                return;
            }
            removeEventListener('message', messageGetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok' && data.value) {
                resolve(data.value);
            } else {
                reject();
            }
        }
        addEventListener('message', messageGetEventWatch, false);
    })

}
function getUuid() {//设置随机id
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
const saveAs = async (json: any, name?: string) => {
    try {
        let handle: FileHandleType | undefined
        Message.warning('正在另存为..');
        handle = await getSaveFileHandle('json', name);
        if (!handle) return;
        const jsonStr = JSON.stringify(json, undefined, '    ');
        await saveFile(handle, jsonStr);
        Message.success('另存成功!');
    } catch (error) {
        Message.error(`另存失败! error: ${error}`);
    }
}
</script>