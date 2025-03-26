<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <div class="prop_edit">
                <span v-if="stringRef === undefined">未设置</span>
                <span class="Undefined_settting" @click.stop="openPop" title="设置属性值">⚙</span>
            </div>
            <span v-if="withUndefined && (stringRef !== undefined)" class="Undefined_settting"
                @click.stop="changeUndefined" title="设为undefined">╳</span>

        </div>
    </div>
    <Window :title="'函数编辑器'" :show="collectionShow" @cancel="collectionShow = false" @ok="changeOk" :width="800"
        :height="500">
        <div style="margin-left:10px">
            <button @click="copyJs">复制</button>
            <button @click="importJsFile">导入</button>
            <button @click="saveJsFile">导出</button>
            <button @click="sampleShow = true">示例文档</button>
        </div>
        <iframe ref="mainIframe" :src="iframeSrc" @load="loadIframe" frameborder="0"
            style="width:100% ; height:calc(100% - 50px);"></iframe>
    </Window>
    <SamplePanel :jsonStr="sampleValue ?? '<center>暂无数据</center>'" :isShow="sampleShow" @changeShow="changeSampleShow">
    </SamplePanel>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { EvalStringProperty } from "earthsdk3";
import { createVueDisposer, getAssetsDir, getOpenFileHandle, toReadonlyVueRef, toVR, getSaveFileHandle, getTextFromFile, saveFile } from "../../../tools";
import { copyClipboard } from "../../../utility/copyClipboard";
import { getUuid } from "../../../utility/getUuid";
import Message from "../../../utility/Message";
import SamplePanel from '../../SamplePanel.vue';
// import Window from "../../WindowPop.vue";
import Window from "../../Window.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

// const iframeSrc = getAssetsDir('/monaco-editor/js-editor.html');
const iframeSrc = './monaco-editor/js-editor.html';

const collectionShow = ref(false)
const sampleShow = ref(false)
const mainIframe = ref<HTMLIFrameElement>();
const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined;
const disposer = createVueDisposer(onBeforeUnmount)
const stringRef = readonly ? toReadonlyVueRef<string | undefined>(disposer, property.reactVar, s => s && s as string) : toVR<string | undefined>(disposer, property.reactVar, s => s && s as string)
const defaultValue = property.defaultValue ?? '';
const sampleValue: string | undefined = property.sampleValue
const stringComRef = ref('')
const changeSampleShow = (flag: boolean) => {
    sampleShow.value = flag
}


const copyJs = async () => {
    const str = await getJs()
    copyClipboard(str)//复制
}

const importSetJs = async (str: string) => {
    await setJs(str)
}
const importJsFile = async () => { //导入文件
    try {
        Message.info('正在打开..')
        const handle = await getOpenFileHandle('js');
        if (!handle) return;
        const str = await getTextFromFile(handle);
        if (!str) return;
        importSetJs(str)
        Message.success('导入成功！')
    } catch (error) {
        Message.error(`打开失败！ error: ${error}`);
    }
}

const saveJsFile = async () => {
    const str = await getJs()
    saveAs(str)
}

const saveAs = async (evalStr: string) => {//导出下载
    try {
        Message.info('正在另存为..');
        const handle = await getSaveFileHandle('js');
        if (!handle) return;
        await saveFile(handle, evalStr);
        Message.success('另存成功!');
    } catch (error) {
        Message.error('另存失败! error: ${error}');
    }
}

const openPop = () => {
    if (stringRef.value === undefined) {
        stringComRef.value = defaultValue
    } else {
        stringComRef.value = JSON.parse(JSON.stringify(stringRef.value))
    }
    collectionShow.value = true
}
const loadIframe = async () => {
    if (!stringComRef.value) {
        return;
    }
    await setJs(stringComRef.value)
}
const changeOk = async () => {
    const str = await getJs()
    stringRef.value = str
    collectionShow.value = false
}

const changeUndefined = () => {
    stringRef.value = undefined
    if (collectionShow.value) {
        collectionShow.value = false
    }
}




function setJs(value: string) {
    return new Promise<void>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const setKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'setJs', id: setKey, value })
        const time = setTimeout(() => {
            removeEventListener('message', messageSetEventWatch, false);
            reject();
        }, 10000);

        const messageSetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'setJsReturn') || (data.id && data.id !== setKey)) {
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

function getJs() {
    return new Promise<string>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const getKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'getJs', id: getKey })
        const time = setTimeout(() => {
            removeEventListener('message', messageGetEventWatch, false);
            reject();
        }, 10000);

        const messageGetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string, value: string | undefined } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'getJsReturn') || (data.id && data.id !== getKey)) {
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

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.readonly_true {
    cursor: not-allowed;
    cursor: no-drop;
}

.readonly_none {
    pointer-events: none;
}


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.Positions {
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
}

.Undefined_settting {
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    ;
}

.Undefined_settting_active {
    color: #64bd63;
}

.Undefined_settting:hover {
    background-color: #383838;
}
</style>
