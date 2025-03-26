<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <String2Prop :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            v-model="string2Ref" :readonly="readonly">
        </String2Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue"
import { String2Property } from "earthsdk3"
import String2Prop from "../commons/String2Prop.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type String2 = [string, string]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const string2Ref = readonly ? toReadonlyVueRef<String2 | undefined>(disposer, property.reactVar, s => s && ([...s] as String2)) : toVR<String2 | undefined>(disposer, property.reactVar, s => s && ([...s] as String2))
const defaultValue: String2 = property.defaultValue ?? ['', '']

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
