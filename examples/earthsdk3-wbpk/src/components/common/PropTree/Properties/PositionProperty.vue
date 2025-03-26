<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <PositionProp :withUndefined="withUndefined" :defaultValue="defaultValue"
                v-model:positionValue="vuePositionRef">
            </PositionProp>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import { PositionProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import PositionProp from "../commons/PositionProp.vue";

type Position = [number, number, number]

const props = withDefaults(defineProps<{
    property: any
}>(), {})

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const defaultValue: Position | undefined = property.defaultValue

const disposer = createVueDisposer(onBeforeUnmount)
const vuePositionRef = readonly ? toReadonlyVueRef<Position | undefined>(disposer, property.reactVar, s => s && [...s] as Position) : toVR<Position | undefined>(disposer, property.reactVar, s => s && [...s] as Position);

</script>

<style scoped>
.Undefined_settting {
    cursor: pointer;
    line-height: 20px;
    width: 20px;
    height: 20px;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 3px;
}

.Undefined_settting:hover {
    background-color: #383838;
}

.Undefined_settting_active {
    color: #64bd63;
}



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

.readonly_none {
    pointer-events: none;
}
</style>
