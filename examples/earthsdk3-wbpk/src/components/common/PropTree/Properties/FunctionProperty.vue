<script setup lang='ts'>
import { FunctionProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount } from "vue";
import { ref } from 'vue'
import Window from "../../WindowPop.vue";
import FuncProp from "../commons/FuncProp.vue"
import { PropertyCompCallbackFuncParamsType } from "./base";

type FunctionValue = string | number | boolean | string[] | number[] | boolean[]

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const { paramsProperty } = property;
const readonly = paramsProperty.readonly
const disposer = createVueDisposer(onBeforeUnmount)
// const funcArrRef = toVR<FunctionValue[]>(disposer, paramsProperty.reactVar, s => s && (JSON.parse(JSON.stringify(s)) as FunctionValue[]))
const paramTypes = paramsProperty.paramTypes
const funcArrRef = ref<FunctionValue[]>([])
const collectionShow = ref(false)
const func = () => property.exec();

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <button @click="func">执行</button>
            <div class="prop_edit">
                <span class="undefined_settting" @click.stop="collectionShow = true" title="设置函数及参数">⚙</span>
            </div>
        </div>
    </div>
    <Window :title="'参数设置'" :footervisible="true" :showCancelButton="false" v-if="collectionShow" :confirmtext="'关闭'"
        @ok="collectionShow = false" :width="700" :height="400">
        <FuncProp v-model="funcArrRef" :paramTypes="paramTypes"></FuncProp>
    </Window>
</template>

<style scoped>
button {
    cursor: pointer;
    width: 60px;
    height: 20px;
    line-height: 19px;
    font-size: 12px;
    margin-right: 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    background-color: #383838;
    border: none;
}

button:hover {
    background-color: #00212b;
}


.undefined_settting {
    cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    margin-left: 10px;
    border-radius: 3px;
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

.readonly_true {
    cursor: not-allowed;
    cursor: no-drop;
}

.readonly_none {
    pointer-events: none;
}
</style>
