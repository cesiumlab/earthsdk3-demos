<script setup lang='ts'>

type defaultValueType = [string, string, string, string]

withDefaults(defineProps<{
    modelValue?: defaultValueType,
    defaultValue?: defaultValueType,
    withUndefined: Boolean
    readonly?: boolean
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);

const inputHandler = (e: any, numberValues: defaultValueType | undefined, num: number) => {
    if (numberValues === undefined) {
        return
    }
    let strArr = [...numberValues]
    strArr[num] = (e.target.value).toString()
    emits('update:modelValue', strArr)
}

const toTheString = (defaultValue: defaultValueType | undefined) => {
    const strArr = defaultValue ?? ['', '', '', '']
    emits('update:modelValue', strArr)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toTheString(defaultValue)" title="设置属性值">⚙</span>
        </div>

        <div v-if="(modelValue !== undefined)" class="input2">

            <input v-for="(item, index) in modelValue" :key="index" type="text" :value="item"
                @input="inputHandler($event, modelValue, index)" />
        </div>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.input2 {
    width: calc(100% - 33px);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input2>input {
    width: 22%;
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
}
</style>
