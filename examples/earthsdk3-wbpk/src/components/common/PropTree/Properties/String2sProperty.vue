<template>
    <String2sProp v-model="string2sRef" :propertyName="propertyName" :defaultValue="defaultValue" :readonly="readonly"
        :withUndefined="withUndefined">
    </String2sProp>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { String2sProperty } from "earthsdk3";
import { PropertyCompCallbackFuncParamsType } from "./base";
import String2sProp from "../commons/String2sProp.vue"

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();
type String2s = [string, string][]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined;
const defaultValue = property.defaultValue ?? [];
const disposer = createVueDisposer(onBeforeUnmount)
const string2sRef = readonly ? toReadonlyVueRef<String2s | undefined>(disposer, property.reactVar, s => s && ([...s] as String2s)) : toVR<String2s | undefined>(disposer, property.reactVar, s => s && ([...s] as String2s))

</script>
<style scoped></style>
