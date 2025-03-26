<template>
    <PopList :title="'矢量瓦片图层'" :showButton="true" @ok="addSceneObjects">
        <!-- 地址 -->
        <div style="width: 100%;font-size: 12px;color: rgba(230, 230, 230, 1);margin-top: 10px">
            <label for="" style="width: 60px;display: inline-block;">地址</label><span style="cursor: pointer;"
                @click="urlWindowShow = true">⚙</span>
        </div>
        <!-- <LabelInput v-model="url" :label="'地址'"></LabelInput> -->
        <!-- accessToken -->
        <LabelInput v-model="accessToken" :label="'accessToken'"></LabelInput>
        <!-- 瓦片尺寸 -->
        <LabelInput v-model="tileSize" :label="'瓦片尺寸'"></LabelInput>
        <!-- 最大级别 -->
        <LabelInput v-model="maximumLevel" :inputType="'number'" :label="'最大级别'"></LabelInput>
        <!-- 最小级别 -->
        <LabelInput v-model="minimumLevel" :inputType="'number'" :label="'最小级别'"> </LabelInput>
        <!-- 最小级别 -->
        <LabelInput v-model="west" :label="'西'" :inputType="'number'" :max="180" :min="-180"> </LabelInput>
        <LabelInput v-model="south" :label="'南'" :inputType="'number'" :max="90" :min="-90"> </LabelInput>
        <LabelInput v-model="east" :label="'东'" :inputType="'number'" :max="180" :min="-180"> </LabelInput>
        <LabelInput v-model="north" :label="'北'" :inputType="'number'" :max="90" :min="-90"> </LabelInput>
        <div style="width: 100%;font-size: 12px;color: rgba(230, 230, 230, 1);margin-top: 10px">
            <label for="" style="width: 60px;display: inline-block;">样式</label><span style="cursor: pointer;"
                @click="windowShow = true">⚙</span>
        </div>
        <Window :title="'样式--编辑器'" :show="windowShow" @ok="changeOk" :width="800" :height="500"
            @cancel="windowShow = false">
            <iframe :src="iframeSrc" frameborder="0" @load="loadIframe(jsonStr)" ref="mainIframe"
                style="width:100%;height:calc(100% - 50px);cursor: not-allowed;"></iframe>
        </Window>
        <Window :title="'地址--编辑器'" :show="urlWindowShow" @ok="urlChangeOk" :width="800" :height="500"
            @cancel="urlWindowShow = false">
            <iframe :src="iframeSrc" frameborder="0" @load="loadIframe(url)" ref="mainIframe"
                style="width:100%;height:calc(100% - 50px);cursor: not-allowed;"></iframe>
        </Window>
    </PopList>
</template>

<script setup lang="ts">
import { Message } from 'earthsdk-ui';
import { ESMVTLayer } from 'earthsdk3-cesium';
import { inject, ref } from 'vue';
import { SceneTree } from 'earthsdk3';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from '../../../components/PopList.vue';
import Window from "../../../components/commom/Window.vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const url = ref()
const accessToken = ref()
const tileSize = ref()
const maximumLevel = ref()
const minimumLevel = ref()
const north = ref()
const east = ref()
const west = ref()
const south = ref()
const jsonStr = ref()
const windowShow = ref(false)
const urlWindowShow = ref(false)
const emits = defineEmits(['close']);
const addSceneObjects = () => {
    if (!url.value) {
        Message.warning('请输入地址')
        return
    }
    let treeItem: any
    const lastSceneTreeItem = sceneTree.lastSelectedItem
    if (!lastSceneTreeItem) {
        treeItem = sceneTree.createSceneObjectTreeItemFromClass(ESMVTLayer)
    } else {
        if (lastSceneTreeItem.type === 'Folder') {
            treeItem = sceneTree.createSceneObjectTreeItemFromClass(ESMVTLayer, undefined, lastSceneTreeItem, 'Inner')
        } else {
            treeItem = sceneTree.createSceneObjectTreeItemFromClass(ESMVTLayer, undefined, lastSceneTreeItem, 'After')
        }
    }
    sceneTree.uiTree.clearAllSelectedItems()
    treeItem.uiTreeObject.selected = true
    const { sceneObject } = treeItem
    sceneObject.url = url.value
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESMVTLayer')
    sceneObject.name = '矢量图层' + (objNum )
    accessToken.value && (sceneObject.accessToken = accessToken.value)
    tileSize.value && (sceneObject.tileSize = tileSize.value)
    maximumLevel.value && (sceneObject.maximumLevel = maximumLevel.value)
    minimumLevel.value && (sceneObject.minimumLevel = minimumLevel.value)
    north.value && east.value && west.value && south.value && (sceneObject.rectangle = [west.value, south.value, east.value, north.value])
    jsonStr.value && (sceneObject.style = jsonStr.value)
    emits("close")

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
const mainIframe = ref<HTMLIFrameElement>();
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
const loadIframe = async (json: any) => {
    const newJson = JSON.stringify(json)
    await setJson(newJson)
}
const iframeSrc ='./monaco-editor/json-editor.html';
const changeOk = async () => {
    const str = await getJson()
    try {
        const json = JSON.parse(str);
        jsonStr.value = json
        windowShow.value = false

    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！error:${error}`);
        return
    }
}
const urlChangeOk = async () => {
    const str = await getJson()
    try {
        const json = JSON.parse(str);
        url.value = json
        urlWindowShow.value = false

    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！error:${error}`);
        return
    }
}
</script>
