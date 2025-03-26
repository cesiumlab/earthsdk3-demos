<script setup lang='ts'>
import ColorPicker from "../../ColorSelect.vue";
import { computed } from 'vue'
type ColorType = [number, number, number, number]

const props = withDefaults(defineProps<{
    modelValue?: ColorType,
    withUndefined?: boolean,
    defaultValue?: ColorType,
    readonly?: boolean,
    propertyName?: string
}>(), { readonly: false, withUndefined: true, propertyName: '属性值' });

const colorRef = computed(() => {
    if (props.modelValue === undefined) {
        return {
            r: 255, g: 255, b: 255, a: 1
        }
    } else {
        return {
            r: props.modelValue[0] * 255,
            g: props.modelValue[1] * 255,
            b: props.modelValue[2] * 255,
            a: props.modelValue[3]
        }
    }
})

const emits = defineEmits(["update:modelValue"]);

const okHandler = (rgba: { r: number, g: number, b: number, a: number }) => {
    const rgbaArr: ColorType = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
    emits('update:modelValue', rgbaArr)
}

const toTheColor = (defaultValue: ColorType | undefined) => {
    const defaultColor = defaultValue ?? [1, 1, 1, 1]
    emits('update:modelValue', defaultColor)
}

const toUndefined = () => {
    emits('update:modelValue', undefined)
}

</script>

<template>
    <div class="prop_box" :class="{ 'readonly_true': readonly }">
        <div v-if="modelValue === undefined">
            <span>未设置</span>
            <span class="set_btn" @click="toTheColor(defaultValue)" title="设置属性值">⚙</span>
        </div>
        <ColorPicker v-if="(modelValue !== undefined)" :color="colorRef" @ok="okHandler" :key="2"></ColorPicker>
        <span v-if="withUndefined && (modelValue !== undefined)" class="set_btn" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.set_btn {
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

.set_btn:hover {
    background-color: #383838;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}
</style>
