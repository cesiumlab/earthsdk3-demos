<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue?: any,
    enumStrsList: [aliasName: any, value: any][],
    withUndefined: boolean,
    defaultValue?: any,
    readonly?: boolean
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);

const modelValueRef = ref<number | string | undefined>('')

onMounted(() => {
    modelValueRef.value = props.modelValue ?? ''
})
watch(modelValueRef, (val) => {
    emits('update:modelValue', val)
})
const setValue = (defaultValue: any) => {
    modelValueRef.value = defaultValue ?? ''
}
const toUndefined = () => {
    modelValueRef.value = undefined
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="setValue(defaultValue)" title="设置属性值">⚙</span>
        </div>
        <select v-if="(modelValue !== undefined)" v-model="modelValueRef">
            <option v-for="(item, index) in enumStrsList" :key="index" :value="item[1]">
                {{ item[0] }}
            </option>
        </select>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
select {
    background: #065164;
    color: #fff;
    font-size: 12px;
    height: 20px;
    width: calc(100% - 34px);
    border: 1px solid #00212b;
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
</style>
