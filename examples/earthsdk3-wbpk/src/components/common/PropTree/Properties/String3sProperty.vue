<template>
    <String3sProp v-model="string3sRef" :propertyName="propertyName" :defaultValue="defaultValue" :readonly="readonly"
        :withUndefined="withUndefined">
    </String3sProp>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { String3sProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import String3sProp from "../commons/String3sProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type String3s = [string, string, string][]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined;
const disposer = createVueDisposer(onBeforeUnmount)
const string3sRef = readonly ? toReadonlyVueRef<String3s | undefined>(disposer, property.reactVar, s => s && ([...s] as String3s)) : toVR<String3s | undefined>(disposer, property.reactVar, s => s && ([...s] as String3s))
const defaultValue: String3s = property.defaultValue ?? []

</script>
<style scoped></style>
