<script setup lang='ts'>

const props=withDefaults(defineProps<{
    modelValue?: number,
    withUndefined: boolean,
    defaultValue: number,
    readonly: boolean,
    minMax: [number, number],
    step: number
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);
const {minMax}=props
const inputHandler = (e: any) => {
    if (Number(e.target.value) >= minMax[1]) {
        emits('update:modelValue', minMax[1])
    } else if (Number(e.target.value) <= minMax[0]) {
        emits('update:modelValue', minMax[0])
    } else {
        emits('update:modelValue', Number(e.target.value))
    }
}

const toNumber = (defaultValue: number) => {
    const num = defaultValue
    emits('update:modelValue', num)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}


</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toNumber(defaultValue)" title="设置属性值">⚙</span>
        </div>
        <input v-if="(modelValue !== undefined)" type="range" :step="step" :title="modelValue.toString()" :min="minMax[0]"
            :max="minMax[1]" :value="modelValue" @input="inputHandler($event)" />
        <input v-if="(modelValue !== undefined)" type="number" :value="modelValue" @input="inputHandler($event)"
            :min="minMax[0]" :max="minMax[1]" :step="step">
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
input[type=range] {
    outline: none;
    cursor: pointer;
    width: calc(100% - 36px);
    height: 5px;
}

.undefined_settting {
    display: inline-block;
    cursor: pointer;
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

.readonly_flag>input:nth-child(2) {
    width: 40px;
    height: 18px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;

}
input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
}
.readonly_true {
    pointer-events: none;
}
</style>
