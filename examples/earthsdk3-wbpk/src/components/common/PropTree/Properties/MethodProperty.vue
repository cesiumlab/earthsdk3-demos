<script setup lang='ts'>
// import { MethodProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import MethodProp from "../commons/MethodProp.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const { paramsProperty } = property;
const readonly = paramsProperty.readonly
const disposer = createVueDisposer(onBeforeUnmount)
const funcArrRef = readonly ? toReadonlyVueRef<any[]>(disposer, paramsProperty.reactVar, s => s && (JSON.parse(JSON.stringify(s)) as any[])) : toVR<any[]>(disposer, paramsProperty.reactVar, s => s && (JSON.parse(JSON.stringify(s)) as any[]))
const paramTypes = paramsProperty.paramTypes
const sampleValue: string | undefined = property.sampleValue

const func = () => property.exec();

const setVal = (arr: any[]) => {
    console.log(arr)
    funcArrRef.value = [...arr]
}
</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <MethodProp :modelValue="funcArrRef" :paramTypes="paramTypes" :readonly="readonly" :sampleValue="sampleValue"
            @setVal="setVal" @func="func">
        </MethodProp>
    </div>
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

.readonly_true {
    cursor: not-allowed;
    cursor: no-drop;
}
</style>
