<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <EnumStringsProp :withUndefined="withUndefined" :defaultValue="defaultValue" :enumStrsList="enums"
            :readonly="readonly" v-model="enumsRef">
        </EnumStringsProp>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { EnumStringsProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { PropertyCompCallbackFuncParamsType } from "./base";
import EnumStringsProp from "../commons/EnumStringsProp.vue"

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const { withUndefined, enums, readonly } = property
const disposer = createVueDisposer(onBeforeUnmount)
const enumsRef = readonly ? toReadonlyVueRef<string[] | undefined>(disposer, property.reactVar, s => s && ([...s] as string[])) : toVR<string[] | undefined>(disposer, property.reactVar, s => s && ([...s] as string[]))
const defaultValue: string[] = property.defaultValue ?? []
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
