<script setup lang='ts'>
import ToggleSwitch from "../../InputCheckBox.vue";
withDefaults(defineProps<{
    modelValue?: boolean,
    defaultValue?: boolean,
    withUndefined: boolean,
    readonly?: boolean
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);


const inputHandler = (flag: boolean) => {
    emits('update:modelValue', flag)
}

const toTheBoolean = (defaultValue: boolean | undefined) => {
    const flag = defaultValue ?? true
    emits('update:modelValue', flag)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toTheBoolean(defaultValue)" title="设置属性值">⚙</span>
        </div>
        <ToggleSwitch v-if="(modelValue !== undefined)" :booleanValue="modelValue" @update:booleanValue="inputHandler">
        </ToggleSwitch>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.undefined_settting {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
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
