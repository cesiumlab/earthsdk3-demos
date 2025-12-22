<template>
    <Window :title="'编辑器'" :readonly="readonly" :show="props.isShow" @cancel="changeCancel" @ok="changeOk" :width="800"
        :height="500">
        <div style="margin-left:10px">
            <button @click="importJsonFile" :class="readonly ? 'readonly_true' : ''" :disabled="readonly">导入</button>
            <button @click="exportJsonFile">导出</button>
        </div>
        <div style="height:calc(100% - 50px)">
            <ESEditor :language="'json'" :readonly="false" @load="loadIframe" ref="editorContainer">
            </ESEditor>
        </div>

    </Window>

</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { getOpenFileHandle, getSaveFileHandle, getTextFromFile, saveFile } from 'earthsdk-ui';
import { saveAs } from "../../components/sceneTree/tools"
import { ESEditor, Message } from "earthsdk-ui"
import Window from "../../components/commom/Window.vue";
const editorContainer = useTemplateRef('editorContainer')
const props = withDefaults(defineProps<{
    jsonStr: string,
    sampleValue?: string,
    isShow: boolean,
    readonly?: boolean
}>(), { readonly: false });
const emits = defineEmits(["changeShow", "getJsonStr"]);

const sampleShow = ref(false)
const loadIframe = () => {
    editorContainer.value?.setVal(props.jsonStr);
}
const changeOk = () => {
    const str = editorContainer.value?.getVal()
    try {
        emits("getJsonStr", str);
        changeCancel()
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！error:${error}`);
        return
    }
}
const changeCancel = () => {
    emits("changeShow", false);
    if (sampleShow.value) {
        sampleShow.value = false
    }
}


const importSetJson = (str: string) => {
    editorContainer.value?.setVal(str);
}
const importJsonFile = async () => { //导入文件
    try {
        Message.warning('正在打开..')
        const handle = await getOpenFileHandle('json');
        if (!handle) return;
        const jsonStr = await getTextFromFile(handle);
        if (!jsonStr) return;
        importSetJson(jsonStr)
        Message.success('导入成功！')
    } catch (error) {
        Message.error(`打开失败！ error: ${error}`);
    }
}
const exportJsonFile = () => {
    const str = editorContainer.value?.getVal() as any
    const newstr = JSON.parse(str)
    saveAs(newstr)
}

</script>
<style scoped>
button {
    width: 80px;
    height: 32px;
    background: rgba(28, 28, 29, 0.60);
    border-radius: 4px;
    border: 1px solid rgba(28, 28, 29, 0.60);
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
    margin-left: 20px;
    margin-top: 10px;
}

button:hover {
    border: 1px solid #2c68f7;
}

.readonly_true {
    cursor: no-drop;
    background-color: #4c4c4c;
}
</style>