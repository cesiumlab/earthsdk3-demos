<template>
    <Number4sProp v-model="number4sRef" :propertyName="propertyName" :defaultValue="defaultValue" :readonly="readonly"
        :withUndefined="withUndefined">
    </Number4sProp>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { Number4sProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import Number4sProp from "../commons/Number4sProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type Number4s = [number, number, number, number][]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined;
const disposer = createVueDisposer(onBeforeUnmount)
const number4sRef = readonly ? toReadonlyVueRef<Number4s | undefined>(disposer, property.reactVar, s => s && ([...s] as Number4s)) : toVR<Number4s | undefined>(disposer, property.reactVar, s => s && ([...s] as Number4s))
const defaultValue: Number4s = property.defaultValue ?? []

</script>
<style scoped></style>
