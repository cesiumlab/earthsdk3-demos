<script setup lang='ts'>
import { ref, watch } from 'vue'
import Window from "../../WindowPop.vue";
const props = withDefaults(defineProps<{
    modelValue?: string | string[],
    withUndefined: boolean,
    defaultValue?: string | string[],
    readonly?: boolean
}>(), { readonly: false })
const emits = defineEmits(["update:modelValue"]);

const stringsRef = ref<undefined | string | string[]>(undefined)

stringsRef.value = props.modelValue

const toTheString = (defaultValue: string[] | string | undefined) => {
    if (Array.isArray(stringsRef.value) || stringsRef.value === undefined) {
        const str = defaultValue ?? ''
        stringsRef.value = str
    }
}
const toTheStrings = (defaultValue: string[] | string | undefined) => {
    if (typeof stringsRef.value === "string" || stringsRef.value === undefined) {
        const strArr = defaultValue ?? ['']
        stringsRef.value = strArr
    }

    viewsShow.value = true
}

const toUndefined = () => {
    stringsRef.value = undefined
}

const changeOk = () => {
    emits('update:modelValue', stringsRef.value)
}



watch(stringsRef, changeOk)

const viewsShow = ref(false);

const addString = () => {
    if (stringsRef.value === undefined) {
        stringsRef.value = []
        stringsRef.value.push('')
    } else if (Array.isArray(stringsRef.value)) {
        stringsRef.value.push('')
    }
}
const deleteString = (index: number) => {
    if (Array.isArray(stringsRef.value)) {
        stringsRef.value.splice(index, 1)
    }

}


</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span>
        </div>
        <span v-if="(Array.isArray(modelValue) || modelValue === undefined)" class="undefined_settting"
            @click="toTheString(defaultValue)" title="设置字符串">⚙</span>
        <span class="undefined_settting" @click="toTheStrings(defaultValue)" title="设置字符串数组">⚙</span>
        <input v-if="(typeof modelValue) === 'string'" type="text" :value="modelValue" />

        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>

    <Window :title="'视口标签'" :footervisible="true" :showCancelButton="false" v-if="viewsShow" :confirmtext="'关闭'"
        @ok="viewsShow = false" :width="600" :height="400">
        <div class="Positions">
            <div class="input3">
                <span>字符数组</span>
                <span class="Undefined_settting" @click="addString()" title="添加">+</span>
            </div>
            <div class="Positions_line" v-for="(_, index) in stringsRef" :key="index">
                <div class="input3">
                    <input type="text" v-if="stringsRef" v-model="stringsRef[index]" />
                    <span class="Undefined_settting" @click="deleteString(index)" title="删除">╳</span>
                </div>
            </div>

        </div>
    </Window>

</template>

<style scoped>
input {
    width: calc(100% - 56px);
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    height: 16px;
    font-size: 12px;
    padding: 0 10px;
}

.undefined_settting {
    cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
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

.readonly_true {
    pointer-events: none;
}

.Positions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.Positions_line {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.input3 {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
    align-items: center;
}

.input3>input {
    width: 100%;
    height: 18px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
}

.Undefined_settting {
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
}

.Undefined_settting:hover {
    background-color: #383838;
}
</style>
