<script setup lang='ts'>
import { computed } from 'vue';
const props = withDefaults(defineProps<{
    modelValue: boolean,
    leftTop?: [number, number],
    rightTop?: [number, number],
    leftBottom?: [number, number],
    rightBottom?: [number, number],
    widthHeight: [number, number],
    title?: string,
}>(), {});

const emits = defineEmits(['update:modelValue']);

const containerStyle = computed(() => {
    if (props.leftTop) {
        return {
            left: `${props.leftTop[0]}px`,
            top: `${props.leftTop[1]}px`,
            width: `${props.widthHeight[0]}px`,
            height: `${props.widthHeight[1]}px`,
        } as any;
    } else if (props.rightTop) {
        return {
            right: `${props.rightTop[0]}px`,
            top: `${props.rightTop[1]}px`,
            width: `${props.widthHeight[0]}px`,
            height: `${props.widthHeight[1]}px`,
        }
    } else if (props.leftBottom) {
        return {
            left: `${props.leftBottom[0]}px`,
            bottom: `${props.leftBottom[1]}px`,
            width: `${props.widthHeight[0]}px`,
            height: `${props.widthHeight[1]}px`,
        }
    } else if (props.rightBottom) {
        return {
            right: `${props.rightBottom[0]}px`,
            bottom: `${props.rightBottom[1]}px`,
            width: `${props.widthHeight[0]}px`,
            height: `${props.widthHeight[1]}px`,
        }
    }
    return {
        width: `${props.widthHeight[0]}px`,
        height: `${props.widthHeight[1]}px`,
    } as any;
})

</script>

<template>
    <div :style="containerStyle" class="via-window" v-show="modelValue">
        <div class="via-window-header">
            <span class="via-window-title">{{ title }}</span>
            <span class="via-window-close" @click="emits('update:modelValue', false)">✕</span>
        </div>
        <div class="via-window-body">
            <slot> </slot>
        </div>
    </div>
</template>

<style scoped>
.via-window {
    position: absolute;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.via-window-header {
    height: 30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.via-window-title {
    margin-left: 10px;
    font-size: var(--vis-font-size-1);
    font-weight: bold;
    letter-spacing: 1px;
}

.via-window-close {
    margin-right: 10px;
    cursor: pointer;
}

.via-window-body {
    width: 100%;
    height: calc(100% - 30px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px 0;
}
</style>
