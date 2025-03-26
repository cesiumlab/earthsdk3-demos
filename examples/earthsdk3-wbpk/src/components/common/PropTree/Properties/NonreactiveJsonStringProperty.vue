<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <div class="prop_edit">
                <span v-if="getJsonStringFunc() === undefined">未设置</span>
                <span class="Undefined_settting" @click.stop="openPop" title="设置属性值">⚙</span>
                <span v-if="withUndefined && (getJsonStringFunc() !== undefined)" class="Undefined_settting"
                    @click.stop="changeUndefined" title="设为undefined">╳</span>
            </div>
        </div>
    </div>
    <JsonStringProp :jsonStr="jsonStr" :isShow="jsonStrShow" @getJsonStr="getJsonStr" @changeShow="changeShow">
    </JsonStringProp>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { NonreactiveJsonStringProperty } from "earthsdk3"
import JsonStringProp from '../commons/JsonStringProps.vue'
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const jsonStrShow = ref(false)
const jsonStr = ref('')

const { property } = props
const { readonly, withUndefined, getJsonStringFunc, setJsonStringFunc, defaultValue = '' } = property

const openPop = () => {
    jsonStr.value = getJsonStringFunc() || defaultValue;
    jsonStrShow.value = true
}

const changeShow = (flag: boolean) => {
    jsonStrShow.value = flag
}

const getJsonStr = (objStr: string) => {
    setJsonStringFunc(objStr);
    jsonStrShow.value = false
}

const changeUndefined = () => {
    setJsonStringFunc(undefined);
}

</script>
<style scoped>
button {
    width: 100px;
    height: 30px;
    font-size: 14px;
    border-radius: 5px;
    background: #383838;
    color: #fff;
    cursor: pointer;
    margin: 0px 10px 10px 0px;
    border: none;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
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


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.Positions {
    width: 100%;
    height: calc(100% - 40px);
    overflow: hidden;
    z-index: 1;
}

.Undefined_settting {
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    ;
}

.Undefined_settting_active {
    color: #64bd63;
}

.Undefined_settting:hover {
    background-color: #383838;
}
</style>
