<script setup lang='ts'>
withDefaults(defineProps<{
    modelValue?: [number, number],
    withUndefined?: boolean,
    defaultValue?: [number, number],
    readonly?: boolean,
    propertyName?: string
}>(), { readonly: false, withUndefined: true, propertyName: "属性值" })

const emits = defineEmits(["update:modelValue"]);

const inputHandler = (e: any, numberValues: [number, number] | undefined, num: number) => {
    if (numberValues === undefined) return
    let numberArr = [...numberValues]
    numberArr[num] = Number(e.target.value)
    emits('update:modelValue', numberArr)
}

const toNumber = (defaultValue: [number, number] | undefined) => {
    const num = defaultValue ?? [0, Number.MAX_VALUE]
    emits('update:modelValue', num)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" :class="{ 'readonly_true': readonly }">
        <div v-if="modelValue === undefined">
            <span>未设置</span>
            <span class="undefined_settting" @click="toNumber(defaultValue)" :title="`设置${propertyName}`">⚙</span>
        </div>
        <div v-if="(modelValue !== undefined)" class="input2">
            <input v-for="(_, index) in modelValue" :key="index" type="number" v-model.lazy="modelValue[index]"
                :disabled="readonly" @input="inputHandler($event, modelValue, index)" />
        </div>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.input2 {
    width: calc(100% - 36px);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input2>input {
    width: 45%;
    height: 18px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
}
input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
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
    user-select: none;
}
</style>
