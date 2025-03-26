<script setup lang='ts'>
import { ref } from 'vue';

withDefaults(defineProps<{
    modelValue?: number,
    withUndefined?: boolean,
    defaultValue?: number,
    readonly?: boolean,
    propertyName?: string
}>(), { withUndefined: true, readonly: false, propertyName: '属性值' })

const emits = defineEmits(["update:modelValue"]);

const timers = ref<NodeJS.Timeout>()

const inputHandler = (e: any) => {
    clearTimeout(timers.value)
    timers.value = setTimeout(() => {
        emits('update:modelValue', Number(e.target.value))
    }, 200);
}

const toNumber = (defaultValue: number | undefined) => {
    const num = defaultValue ?? 0
    emits('update:modelValue', num)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" :class="{ 'readonly_true': readonly }">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toNumber(defaultValue)"
                :title="`设置${propertyName}`">⚙</span>
        </div>

        <input v-if="(modelValue !== undefined)" type="number" :disabled="readonly" :value="modelValue"
            @input="inputHandler($event)" />

        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
input {
    width: calc(100% - 56px);
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    height: 20px;
    font-size: 12px;
    padding: 0 10px;
}

input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
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

.readonly_true {
    pointer-events: none;
    user-select: none;
}
</style>
