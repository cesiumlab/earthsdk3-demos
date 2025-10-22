<template>
    <div class="status-bar">
        <div class="status-info">
            <span class="status-item fps">FPS: {{ formattedFps }}</span>
            <span class="status-item camera-position">相机位置: {{ formattedPosition }}</span>
            <span class="status-item yaw">偏航角: {{ formattedYaw }}°</span>
            <span class="status-item pitch">俯仰角: {{ formattedPitch }}°</span>
            <span class="status-item mouse-position" :title="mousePositionTitle" @dblclick="copyMousePosition">
                {{ mousePositionText }}
            </span>
        </div>
        <div v-show="$config.modelShow" class="version-info" :class="{ 'version-info-active': versionInfoListShow }"
            @click="toggleVersionInfo" v-click-outside="clickOutside">
            版本
        </div>
    </div>
    <Version v-show="versionInfoListShow" />
</template>

<script setup lang="ts">
import { vClickOutside } from 'earthsdk-ui';
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import { $config } from "@/scripts/getConfig";
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import Version from "./Version.vue";
import { useStatusBar } from "./useStatusBar";

// 响应式数据
const versionInfoListShow = ref(false);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

// 使用状态栏hook
const {
    reinitialize,
    destroy,
    copyMousePosition,
    getFormattedFps,
    getFormattedPosition,
    getFormattedYaw,
    getFormattedPitch,
    getMousePositionText,
    getMousePositionTitle
} = useStatusBar(xbsjEarthUi);

// 计算属性
const formattedFps = computed(() => getFormattedFps());

const formattedPosition = computed(() => getFormattedPosition());

const formattedYaw = computed(() => getFormattedYaw());

const formattedPitch = computed(() => getFormattedPitch());

const mousePositionText = computed(() => getMousePositionText());

const mousePositionTitle = computed(() => getMousePositionTitle());

// 方法
const toggleVersionInfo = () => {
    versionInfoListShow.value = !versionInfoListShow.value;
};
const clickOutside = () => {
    console.log('clickOutside');
    versionInfoListShow.value = false;
};

// 生命周期钩子
onMounted(() => {
    reinitialize();
    // 监听视图器变化
    const dispose = xbsjEarthUi.activeViewerChanged.don(() => { reinitialize(); })

    onBeforeUnmount(() => {
        destroy();
        dispose();
    });
});


</script>

<style scoped>
@import './index.css';
</style>
