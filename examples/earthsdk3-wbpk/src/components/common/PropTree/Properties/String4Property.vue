<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <String4Prop :withUndefined="withUndefined" :propertyName="propertyName" :defaultValue="defaultValue"
            v-model="string4Ref" :readonly="readonly">
        </String4Prop>
    </div>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue"
import { String4Property } from "earthsdk3"
import String4Prop from "../commons/String4Prop.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

type String4 = [string, string, string, string]
const { property } = props
const readonly = property.readonly
const propertyName = property.name
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const string4Ref = readonly ? toReadonlyVueRef<String4 | undefined>(disposer, property.reactVar, s => s && ([...s] as String4)) : toVR<String4 | undefined>(disposer, property.reactVar, s => s && ([...s] as String4))
const defaultValue: String4 = property.defaultValue ?? ['', '', '', '']

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
