<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <NumberSliderProp :withUndefined="withUndefined" v-model="numberRef" :defaultValue="defaultValue"
            :minMax="minMax" :readonly="readonly" :step="step">
        </NumberSliderProp>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { NumberSliderProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { PropertyCompCallbackFuncParamsType } from "./base";
import NumberSliderProp from "../commons/NumberSliderProp.vue"

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const { minMax, readonly, withUndefined, step } = property
const disposer = createVueDisposer(onBeforeUnmount)
const numberRef = readonly ? toReadonlyVueRef<number | undefined>(disposer, property.reactVar, s => s) : toVR<number | undefined>(disposer, property.reactVar, s => s)
const defaultValue: number = property.defaultValue ?? (minMax[1] / 2)

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
