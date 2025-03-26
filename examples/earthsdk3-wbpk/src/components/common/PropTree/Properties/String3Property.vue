<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <String3Prop :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            v-model="string3Ref" :readonly="readonly">
        </String3Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue"
import { String3Property } from "earthsdk3"
import String3Prop from "../commons/String3Prop.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type String3 = [string, string, string]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const string3Ref = readonly ? toReadonlyVueRef<String3 | undefined>(disposer, property.reactVar, s => s && ([...s] as String3)) : toVR<String3 | undefined>(disposer, property.reactVar, s => s && ([...s] as String3))
const defaultValue: String3 = property.defaultValue ?? ['', '', '']

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
