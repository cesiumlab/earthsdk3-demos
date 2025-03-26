<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <StringProp :withUndefined="withUndefined" :defaultValue="defaultValue" v-model="stringRef"
            :readonly="readonly">
        </StringProp>
    </div>
</template>

<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools"
import { onBeforeUnmount } from "vue"
import { UriProperty } from "earthsdk3"
import StringProp from "../commons/StringProp.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";
const props = withDefaults(defineProps<{
    property: any
}>(), {})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const stringRef = readonly ? toReadonlyVueRef<string | undefined>(disposer, property.reactVar, s => s) : toVR<string | undefined>(disposer, property.reactVar, s => s)
const defaultValue: string | undefined = property.defaultValue

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
