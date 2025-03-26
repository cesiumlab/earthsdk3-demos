<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Number2Porp :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            v-model="number2Ref" :readonly="readonly">
        </Number2Porp>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue"
import { Number2Property } from "earthsdk3"
import Number2Porp from "../commons/Number2Porp.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type Number2 = [number, number]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const number2Ref = readonly ? toReadonlyVueRef<Number2 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number2)) : toVR<Number2 | undefined>(disposer, property.reactVar, s => s && ([...s] as Number2))
const defaultValue: Number2 = property.defaultValue ?? [0, 0]

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
