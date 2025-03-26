<template>
    <Window :title="'编辑器'" :readonly="readonly" :show="props.isShow" @cancel="changeCancel" @ok="changeOk" :width="800"
        :height="500">
        <div style="margin-left:10px">
            <button @click="copyJson">复制</button>
            <button @click="importJsonFile" :class="readonly ? 'readonly_true' : ''" :disabled="readonly">导入</button>
            <button @click="exportJsonFile">导出</button>
            <button @click="sampleDocument">示例文档</button>
        </div>
        <iframe :src="iframeSrc" frameborder="0" @load="loadIframe" ref="mainIframe"
            style="width:100%;  height:calc(100% - 50px);cursor: not-allowed;"></iframe>
    </Window>

    <SamplePanel :jsonStr="props.sampleValue ?? '<center>暂无数据</center>'" :isShow="sampleShow"
        @changeShow="changeSampleShow">
    </SamplePanel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getOpenFileHandle, getSaveFileHandle, getTextFromFile, saveFile, getAssetsDir } from '../../../tools';
import { copyClipboard } from '../../../utility/copyClipboard';
import Message from '../../../utility/Message';
import SamplePanel from '../../SamplePanel.vue';
import Window from "../../Window.vue";
const props = withDefaults(defineProps<{
    jsonStr: string,
    sampleValue?: string,
    isShow: boolean,
    readonly?: boolean
}>(), { readonly: false });
const emits = defineEmits(["changeShow", "getJsonStr"]);
const mainIframe = ref<HTMLIFrameElement>();

const iframeSrc = './monaco-editor/json-editor.html';
// const iframeSrc = getAssetsDir('/monaco-editor/json-editor.html');

// 
const sampleShow = ref(false)

const loadIframe = async () => {
    await setJson(props.jsonStr)

}
const changeOk = async () => {
    const str = await getJson()
    try {
        const json = JSON.parse(str);
        // console.log('json', json);
        emits("getJsonStr", str);
        changeCancel()
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error('JSON格式错误！');
        return
    }
}
const changeCancel = () => {
    emits("changeShow", false);
    if (sampleShow.value) {
        sampleShow.value = false
    }
}

const copyJson = async () => {
    const str = await getJson()
    copyClipboard(str)//复制
}

const importSetJson = async (str: string) => {
    await setJson(str)
}

const importJsonFile = async () => { //导入文件
    try {
        Message.info('正在打开..')
        const handle = await getOpenFileHandle('json');
        if (!handle) return;
        const jsonStr = await getTextFromFile(handle);
        if (!jsonStr) return;
        importSetJson(jsonStr)
        Message.success('导入成功！')
    } catch (error) {
        Message.error('打开失败！ error: ${error}');
    }
}
const exportJsonFile = async () => {
    const str = await getJson()
    saveAs(str)
}
const saveAs = async (jsonStr: string, name?: string) => {
    try {
        Message.info('正在另存为..');
        const handle = await getSaveFileHandle('json', name);
        if (!handle) return;
        await saveFile(handle, jsonStr);
        Message.success('另存成功!');
    } catch (error) {
        Message.error('另存失败! error: ${error}');
    }
}

function getUuid() {
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

function setJson(value: string) {
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

function getJson() {
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


const sampleDocument = () => {
    sampleShow.value = true
}

const changeSampleShow = (flag: boolean) => {
    sampleShow.value = flag
}


</script>
<style scoped>
button {
    width: 80px;
    height: 30px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    margin: 5px 10px 5px 0px;
    user-select: none;
    border: 1px solid #384b50;
    background-color: #0d2b34;
}

button:hover {
    background-color: #00212b;
}

.readonly_true {
    cursor: no-drop;
    background-color: #4c4c4c;
}
</style>
