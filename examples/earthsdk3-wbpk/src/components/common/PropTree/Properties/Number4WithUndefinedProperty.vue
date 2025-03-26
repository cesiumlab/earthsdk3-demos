<template>
    <Number4WithUndefinedProp v-model="number4Ref" :propertyName="propertyName" :withUndefined="withUndefined"
        :readonly="readonly" :defaultValue="defaultValue"></Number4WithUndefinedProp>
</template>


<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { Number4WithUndefinedProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import Number4WithUndefinedProp from "../commons/Number4WithUndefinedProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type numType = [number | undefined, number | undefined, number | undefined, number | undefined]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const number4Ref = readonly ? toReadonlyVueRef<numType | undefined>(disposer, property.reactVar, s => s && ([...s] as numType)) : toVR<numType | undefined>(disposer, property.reactVar, s => s && ([...s] as numType))
const defaultValue: numType = property.defaultValue ?? [undefined, undefined, undefined, undefined]

</script>
<style scoped></style>
