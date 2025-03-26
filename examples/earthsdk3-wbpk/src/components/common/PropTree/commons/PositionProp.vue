<script setup lang='ts'>
const props = defineProps<{
    positionValue?: [number, number, number],
    defaultValue?: [number, number, number],
    withUndefined: Boolean
}>()

const emits = defineEmits([
    "update:positionValue"
]);

const inputHandler = (e: any, num: number) => {
    if (!props.positionValue) return
    let numberArr = [...props.positionValue]
    numberArr[num] = Number(e.target.value)
    emits('update:positionValue', numberArr)
}

const setDefaultValueIfUndefined = (defaultValue?: [number, number, number]) => {
    const numberArr = defaultValue ?? [0, 0, 0]
    emits('update:positionValue', numberArr)
}

const toUndefined = () => {
    emits('update:positionValue', undefined)
}

</script>

<template>
    <div v-if="!positionValue">
        <span>未设置</span><span class="undefined_settting" @click="setDefaultValueIfUndefined(defaultValue)"
            title="设置属性值">⚙</span>
    </div>
    <div v-else class="input2">
        <input v-for="(_, index) in positionValue" :key="index" type="number" v-model.number.lazy="positionValue[index]" />
    </div>
    <span v-if="withUndefined && (positionValue !== undefined)" class="undefined_settting" @click="toUndefined()"
        title="设为undefined">╳</span>
</template>

<style scoped>
.input2 {
    width: calc(100% - 36px);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input2>input {
    width: 30%;
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
