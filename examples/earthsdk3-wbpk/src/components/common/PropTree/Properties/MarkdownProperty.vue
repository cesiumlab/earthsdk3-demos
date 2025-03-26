<script setup lang='ts'>
import { createVueDisposer, toReadonlyVueRef } from "../../../tools";
// import { MarkdownProperty } from "earthsdk3";
import SamplePanel from '../../SamplePanel.vue';
import { PropertyCompCallbackFuncParamsType } from "./base";
import { onBeforeUnmount, ref } from "vue";


const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props;
const disposer = createVueDisposer(onBeforeUnmount);
const propertyName = property.name;
const markdownStr = toReadonlyVueRef<string | undefined>(disposer, property.reactVar, s => s && s as string)
const markdownShow = ref(false)

</script>

<template>
    <div class="readonly_flag">
        <button @click="markdownShow = true">查看</button>
    </div>
    <SamplePanel :jsonStr="markdownStr ?? '<center>暂无数据</center>'" :propertyName="propertyName" :isShow="markdownShow"
        @changeShow="markdownShow = false">
    </SamplePanel>
</template>

<style scoped>
.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

button {
    cursor: pointer;
    width: 60px;
    height: 20px;
    line-height: 19px;
    font-size: 12px;
    margin-right: 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    background-color: #383838;
    border: none;
}

button:hover {
    background-color: #242424;
}
</style>
