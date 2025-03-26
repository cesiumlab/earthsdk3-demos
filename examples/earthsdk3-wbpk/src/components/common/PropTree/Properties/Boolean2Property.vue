<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <Boolean2Prop :withUndefined="withUndefined" :defaultValue="defaultValue" :readonly="readonly"
            v-model="booleansRef">
        </Boolean2Prop>
    </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { Boolean2Property } from "earthsdk3";
import Boolean2Prop from "../commons/Boolean2Prop.vue";
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
const booleansRef = readonly ? toReadonlyVueRef<[boolean, boolean] | undefined>(disposer, property.reactVar, s => s && ([...s] as [boolean, boolean])) : toVR<[boolean, boolean] | undefined>(disposer, property.reactVar, s => s && ([...s] as [boolean, boolean]))
const defaultValue: [boolean, boolean] | undefined = property.defaultValue

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
