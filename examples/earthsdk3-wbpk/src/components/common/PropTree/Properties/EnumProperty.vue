<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <EnumProp :withUndefined="withUndefined" :defaultValue="defaultValue" :enumStrsList="enumStrsList"
            :readonly="readonly" v-model="enumRef">
        </EnumProp>
    </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { EnumProperty } from "earthsdk3";
import EnumProp from "../commons/EnumProp.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const withUndefined = property.withUndefined
const enumStrsList = property.enums
const readonly = property.readonly
const disposer = createVueDisposer(onBeforeUnmount)
const enumRef = readonly ? toReadonlyVueRef<any>(disposer, property.reactVar, s => s) : toVR<any>(disposer, property.reactVar, s => s)
const defaultValue: any = property.defaultValue
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
