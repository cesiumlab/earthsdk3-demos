<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Number4Prop :withUndefined="withUndefined" :defaultValue="defaultValue" :readonly="readonly"
            v-model="NearFarScalerRef">
        </Number4Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import Number4Prop from "../commons/Number4Prop.vue"
import { NearFarScalerProperty } from "earthsdk3"
import { onBeforeUnmount } from "vue"
import { PropertyCompCallbackFuncParamsType } from "./base";
type NearFarScaler = [number, number, number, number]
const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const NearFarScalerRef = readonly ? toReadonlyVueRef<NearFarScaler | undefined>(disposer, property.reactVar, s => s && ([...s] as NearFarScaler)) : toVR<NearFarScaler | undefined>(disposer, property.reactVar, s => s && ([...s] as NearFarScaler))
const defaultValue: NearFarScaler = property.defaultValue ?? [0, 0, 1, 0]

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
