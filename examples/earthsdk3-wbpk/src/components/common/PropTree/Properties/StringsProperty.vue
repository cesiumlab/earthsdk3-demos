<template>
    <StringsProp :propertyName="propertyName" :withUndefined="withUndefined" :defaultValue="defaultValue"
        v-model="stringsRef" :readonly="readonly" @ondrop="event => callback('ondrop', event)"
        @ondragover="event => callback('ondragover', event)" @ondragleave="event => callback('ondragleave', event)">
    </StringsProp>
</template>
<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { StringsProperty } from "earthsdk3"
import { onBeforeUnmount, getCurrentInstance } from "vue"
import StringsProp from "../commons/StringsProp.vue"
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
const stringsRef = readonly ? toReadonlyVueRef<string[] | undefined>(disposer, property.reactVar, s => s && ([...s] as string[])) : toVR<string[] | undefined>(disposer, property.reactVar, s => s && ([...s] as string[]))
const defaultValue: string[] = property.defaultValue ?? []

const intstance = getCurrentInstance();

const callback = (customEventName: string, event: MouseEvent) => {
    if (!intstance) {
        return
    }
    emits('callback', {
        componentInstance: intstance,
        property,
        customEventName,
        otherParams: [event],
    })
}

</script>

<style scoped></style>
