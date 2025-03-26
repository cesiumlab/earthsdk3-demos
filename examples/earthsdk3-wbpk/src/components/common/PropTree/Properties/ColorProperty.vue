<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <ColorProp :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            :readonly="readonly" v-model="colorRef">
        </ColorProp>
    </div>
</template>

<script lang="ts" setup>
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { ColorProperty } from "earthsdk3";
import ColorProp from "../commons/ColorProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type ColorType = [number, number, number, number]

const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined;
const disposer = createVueDisposer(onBeforeUnmount);
const colorRef = readonly ? toReadonlyVueRef<ColorType | undefined>(disposer, property.reactVar, s => s && ([...s] as ColorType)) : toVR<ColorType | undefined>(disposer, property.reactVar, s => s && ([...s] as ColorType))
const defaultValue: ColorType = property.defaultValue ?? [1, 1, 1, 1]

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
