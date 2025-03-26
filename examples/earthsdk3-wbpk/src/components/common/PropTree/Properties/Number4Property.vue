<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Number4Prop :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            :readonly="readonly" v-model="number4Ref">
        </Number4Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import Number4Prop from "../commons/Number4Prop.vue"
import { Number4Property } from "earthsdk3"
import { onBeforeUnmount } from "vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();
type Number4 = [number, number, number, number]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const number4Ref = readonly ? toReadonlyVueRef<Number4 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number4)) : toVR<Number4 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number4))
const defaultValue: Number4 = property.defaultValue ?? [0, 0, 0, 0]
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
