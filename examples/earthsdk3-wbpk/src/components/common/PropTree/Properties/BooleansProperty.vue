<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <BooleansProp :withUndefined="withUndefined" :defaultValue="defaultValue" :readonly="readonly"
            v-model="booleansRef">
        </BooleansProp>
    </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { BooleansProperty } from "earthsdk3";
import BooleansProp from "../commons/BooleansProp.vue";
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
const booleansRef = readonly ? toReadonlyVueRef<boolean[] | undefined>(disposer, property.reactVar, s => s && ([...s] as boolean[])) : toVR<boolean[] | undefined>(disposer, property.reactVar, s => s && ([...s] as boolean[]))
const defaultValue: boolean[] | undefined = property.defaultValue

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
