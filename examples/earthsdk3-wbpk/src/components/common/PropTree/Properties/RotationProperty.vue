<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Number3Prop :withUndefined="withUndefined" :defaultValue="defaultValue" v-model="rotationRef"
            :readonly="readonly">
        </Number3Prop>
    </div>
</template>


<script setup lang="ts">
import Number3Prop from "../commons/Number3Prop.vue"
import { RotationProperty } from "earthsdk3"
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools"
import { onBeforeUnmount } from "vue"
import { PropertyCompCallbackFuncParamsType } from "./base";
type Rotation = [number, number, number]
const props = withDefaults(defineProps<{
    property: any
}>(), {})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();
const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const rotationRef = readonly ? toReadonlyVueRef<Rotation | undefined>(disposer, property.reactVar, s => s && ([...s] as Rotation)) : toVR<Rotation | undefined>(disposer, property.reactVar, s => s && ([...s] as Rotation))
const defaultValue: Rotation | undefined = property.defaultValue
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
}
</style>
