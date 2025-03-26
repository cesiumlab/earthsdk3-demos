<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Boolean3sProp :withUndefined="withUndefined" :defaultValue="defaultValue" :readonly="readonly"
            v-model="boolean3sRef">
        </Boolean3sProp>
    </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { Boolean3sProperty } from "earthsdk3";
import Boolean3sProp from "../commons/Boolean3sProp.vue";
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
const readonly = property.readonly
const disposer = createVueDisposer(onBeforeUnmount)
const boolean3sRef = readonly ? toReadonlyVueRef<[boolean, boolean, boolean][] | undefined>(disposer, property.reactVar, s => s && ([...s] as [boolean, boolean, boolean][])) : toVR<[boolean, boolean, boolean][] | undefined>(disposer, property.reactVar, s => s && ([...s] as [boolean, boolean, boolean][]))
const defaultValue: [boolean, boolean, boolean][] | undefined = property.defaultValue

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
