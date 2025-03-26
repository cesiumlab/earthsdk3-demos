<template>
    <Number3sProp v-model="number3sRef" :propertyName="propertyName" :defaultValue="defaultValue" :readonly="readonly"
        :withUndefined="withUndefined">
    </Number3sProp>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { Number3sProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import Number3sProp from "../commons/Number3sProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type Number3s = [number, number, number][]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined;
const disposer = createVueDisposer(onBeforeUnmount)
const number3sRef = readonly ? toReadonlyVueRef<Number3s | undefined>(disposer, property.reactVar, s => s && ([...s] as Number3s)) : toVR<Number3s | undefined>(disposer, property.reactVar, s => s && ([...s] as Number3s))
const defaultValue: Number3s = property.defaultValue ?? []

</script>
<style scoped></style>
