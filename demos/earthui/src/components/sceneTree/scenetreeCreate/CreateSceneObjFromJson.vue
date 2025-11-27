<template>
    <Window :minWidthHeight="[300, 200]" :title="'编辑器'" :show="props.isShow" @cancel="changeCancel" @ok="changeOk"
        :width="800" :height="500">
        <ESEditor :language="'json'" :readonly="false" @load="load" ref="editorContainer">
        </ESEditor>
    </Window>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { ESEditor, Message } from "earthsdk-ui"
import Window from "../../../components/commom/Window.vue";
const emits = defineEmits(["changeShow", "confirm"]);
const editorContainer = useTemplateRef('editorContainer')
const props = withDefaults(defineProps<{
    isShow: boolean,
    json?: any
}>(), { json: {} });
const load = () => {
    editorContainer.value?.setVal(JSON.stringify(props.json, undefined, '    '));
}
const changeOk = () => {
    const str = editorContainer.value?.getVal()
    try {
        const json = JSON.parse(str);
        if (json) {
            emits("confirm", json)
        }
        changeCancel()
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！ error: ${error}`);
        return
    }
}
const changeCancel = () => {
    emits("changeShow", false);
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