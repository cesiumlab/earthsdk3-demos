<script setup lang='ts'>
import ToggleSwitch from "./base/InputCheckBox.vue";
const p=withDefaults(defineProps<{
    modelValue?: boolean,
    readonly?: boolean,
    defaultValue:any,
}>(), { readonly: false })

const emits = defineEmits(["update:modelValue"]);
const inputHandler = (flag: boolean) => {
    emits('update:modelValue', flag)
}

</script>

<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <ToggleSwitch :booleanValue="modelValue ?? false" @update:booleanValue="inputHandler" :defaultValue="defaultValue">
        </ToggleSwitch>
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
