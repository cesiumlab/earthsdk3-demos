<template>
    <div class="navigator" ref="navigatorRef" @click="flyToNorth">
        <img class="navigator_img" src="../../../../assets/view/zhinanzhen.png" draggable="false" alt="">
    </div>
</template>

<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { inject, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { useNavigator } from './useNavigator';

// 注入 EarthUI 实例
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

// DOM 引用
const navigatorRef = useTemplateRef('navigatorRef');

// 使用自定义 Hook
const { flyToNorth, initNavigator, destroy } = useNavigator(xbsjEarthUi, navigatorRef);

// 组件挂载时初始化
onMounted(() => { initNavigator(); });

// 组件销毁前清理资源
onBeforeUnmount(() => { destroy(); });
</script>

<style scoped>
.navigator {
    position: fixed;
    cursor: pointer;
    width: 100px;
    height: 100px;
    top: 90px;
    right: 290px;
    transition: right 0.4s linear;
    user-select: none;
}

.navigator_img {
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
