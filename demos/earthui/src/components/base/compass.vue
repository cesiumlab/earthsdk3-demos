<template>
    <div class="compass-app" :style="compassStyle" @click="handleReset">
        <div class="compass-body">
            <!-- 刻度环容器 -->
            <div class="rotate-wrapper scale-ring">
                <!-- N 标识 -->
                <div class="north-label">N</div>
                <!-- 刻度线 -->
                <div v-for="i in 11" :key="i" class="scale-line" :class="{ major: i % 3 === 0 }"
                    :style="{ transform: `rotate(${i * 30}deg)` }">
                    <div class="line-inner"></div>
                </div>
            </div>

            <!-- 中心区域 -->
            <div class="core-container">
                <div class="crosshair-h"></div>
                <div class="crosshair-v"></div>

                <!-- 指针容器 -->
                <div class="rotate-wrapper pointer-box">
                    <svg width="40" height="40" viewBox="0 0 32 32" style="overflow: visible">
                        <!-- 底部白色指针 -->
                        <path d="M16 2 L21 16 L16 30 L11 16 Z" fill="white"
                            style="filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))" />
                        <!-- 顶部蓝色指示北 -->
                        <path d="M16 2 L11 16 L16 19 L21 16 Z" fill="var(--el-color-primary)" />
                        <!-- 中心圆点增加质感 -->
                        <circle cx="16" cy="16" r="1.5" fill="rgba(0, 0, 0, 0.2)" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * 组件属性定义
 */
interface CompassProps {
    /** 旋转角度（度数），0-360 */
    rotation?: number
}

/**
 * 组件事件定义
 */
interface CompassEmits {
    /** 点击还原时触发的回调 */
    (e: 'reset'): void
}

// 定义属性，设置默认值
const props = withDefaults(defineProps<CompassProps>(), {
    rotation: 0
})

// 定义事件
const emit = defineEmits<CompassEmits>()

/**
 * 计算CSS变量样式
 */
const compassStyle = computed(() => ({
    '--compass-rotation': `${props.rotation}deg`
}))

/**
 * 处理点击还原事件
 */
const handleReset = () => {
    emit('reset')
}
</script>


<style scoped lang="scss">
.compass-app {
    position: relative;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    // CSS变量定义
    --compass-rotation: 0deg;
}

.compass-body {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    // 使用 Element Plus 边框颜色变量
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.compass-body:hover {
    transform: scale(1.04);
}


/* 统一旋转包装器，确保以正中心旋转 */
.rotate-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(calc(-1 * var(--compass-rotation)));
    transform-origin: center center;
}

.scale-ring {
    position: relative;
}

.north-label {
    position: absolute;
    top: 0px;
    font-size: var(--el-font-size-extra-small);
    font-weight: 900;
    color: var(--el-color-primary);
}

.scale-line {
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    margin-left: -0.5px;

    .line-inner {
        position: absolute;
        top: 6px;
        width: 100%;
        height: 5px;
        // 使用 Element Plus 文本颜色变量（占位符）
        background-color: var(--el-text-color-placeholder);
        opacity: 0.3;
    }

    &.major .line-inner {
        height: 10px;
        // 使用 Element Plus 次要文本颜色
        background-color: var(--el-text-color-secondary);
        opacity: 0.6;
    }
}

.core-container {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.crosshair-h {
    position: absolute;
    width: 80%;
    height: 1px;
    // 使用 Element Plus 边框颜色
    // background: var(--el-border-color-extra-light);
    background-color: var(--el-text-color-placeholder);
    opacity: 0.3;
}

.crosshair-v {
    position: absolute;
    height: 80%;
    width: 1px;
    // 使用 Element Plus 边框颜色
    // background: var(--el-border-color-extra-light);
    background-color: var(--el-text-color-placeholder);
    opacity: 0.3;
}

/* 指针容器，强制居中 */
.pointer-box {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
