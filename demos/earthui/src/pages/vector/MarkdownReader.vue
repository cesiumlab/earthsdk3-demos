<script setup lang='ts'>
import { ref, useTemplateRef, watch } from 'vue';
import { ESSceneObject } from "earthsdk3";
import { ESEditor } from "earthsdk-ui"
const props = withDefaults(defineProps<{ markdownStr?: string, isJson?: boolean }>(), { isJson: false });
const editorContainer = useTemplateRef('editorContainer')
const loadIframe = async () => {
    editorContainer.value?.setVal(props.markdownStr ?? '<center>暂无数据</center>')
}

watch(() => props.markdownStr, () => {
    loadIframe()
})

</script>

<template>
    <div style="width:100%;height:100%;">
        <ESEditor :language="isJson ? 'json' : 'html'" :readonly="false" @load="loadIframe" ref="editorContainer">
        </ESEditor>
    </div>
</template>
