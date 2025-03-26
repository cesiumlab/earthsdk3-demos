<template>
    <div class="readonly_flag">
        <div class="prop_edit">
            <span v-if="objectRef === undefined">未设置</span>
            <span class="undefined_settting" @click.stop="openProvider()" title="设置属性值">⚙</span>
            <span v-if="withUndefined && (objectRef !== undefined)" :class="readonly ? 'readonly_settting' : ''"
                class="undefined_settting" @click.stop="changeUndefined" title="设为undefined">╳</span>
        </div>
    </div>
    <JsonStringProps :readonly="readonly" :jsonStr="jsonStr" :isShow="jsonStrShow" :sampleValue="sampleValue"
        @getJsonStr="getJsonStr" @changeShow="changeShow">
    </JsonStringProps>
</template>

<script setup lang='ts'>
import { JsonProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount, ref, Ref } from "vue";
import { JsonValue } from "xbsj-base";
import JsonStringProps from '../commons/JsonStringProps.vue';
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined;
const sampleValue: string | undefined = property.sampleValue
const defaultValue = (property.defaultValue !== undefined) && JSON.stringify(property.defaultValue, undefined, '    ') || '';
const disposer = createVueDisposer(onBeforeUnmount)

const objectRef = readonly ? toReadonlyVueRef<JsonValue, JsonValue>(disposer, property.reactVar) as Ref<JsonValue> : toVR<JsonValue, JsonValue>(disposer, property.reactVar) as Ref<JsonValue>

const jsonStrShow = ref(false)
const jsonStr = ref('')

const openProvider = () => {
    jsonStr.value = (objectRef.value !== undefined) && JSON.stringify(objectRef.value, undefined, '    ') || defaultValue;
    jsonStrShow.value = true
}

const changeShow = (flag: boolean) => {
    jsonStrShow.value = flag
}

const getJsonStr = (objStr: string) => {
    try {
        objectRef.value = JSON.parse(objStr)
    } catch (error) {
        console.error(error);
    }
    jsonStrShow.value = false
}

const changeUndefined = () => {
    if (readonly) return
    objectRef.value = undefined
    if (jsonStrShow.value) {
        jsonStrShow.value = false
    }
}

</script>

<style scoped>
label {
    width: 150px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
}

.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.undefined_settting {
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    margin-left: 10px;
    line-height: 20px;
    border-radius: 3px;
    text-align: center;
}

.undefined_settting:hover {
    background-color: #383838;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.readonly_settting {
    cursor: not-allowed;
    color: #999;
    background-color: #383838;
}
</style>
