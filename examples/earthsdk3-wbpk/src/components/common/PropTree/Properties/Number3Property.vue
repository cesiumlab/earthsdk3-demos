<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Number3Prop :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            v-model="number3Ref" :readonly="readonly">
        </Number3Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue"
import { Number3Property } from "earthsdk3"
import Number3Prop from "../commons/Number3Prop.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type Number3 = [number, number, number]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const number3Ref = readonly ? toReadonlyVueRef<Number3 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number3)) : toVR<Number3 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number3))
const defaultValue: Number3 = property.defaultValue ?? [0, 0, 0]

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
