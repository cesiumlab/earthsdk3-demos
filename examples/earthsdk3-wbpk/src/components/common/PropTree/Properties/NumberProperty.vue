<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <NumberProp :withUndefined="withUndefined" v-model="numberRef" :defaultValue="defaultValue"
            :propertyName="propertyName" :readonly="readonly">
        </NumberProp>
    </div>
</template>
<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools"
import { onBeforeUnmount } from "vue"
import { NumberProperty } from "earthsdk3"
import NumberProp from '../commons/NumberProp.vue'
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const numberRef = readonly ? toReadonlyVueRef<number | undefined>(disposer, property.reactVar, s => s) : toVR<number | undefined>(disposer, property.reactVar, s => s)
const defaultValue: number = property.defaultValue ?? 0

</script>
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
    user-select: none;
}
</style>
