<template>
    <div class="xbsj-box">
        <div class="xbsjLeft" :style="{ width: leftWidth + 'px' }" v-show="resizeAll">
            <slot name="code"></slot>
        </div>
        <div class="xbsjResize" @mousedown="dragEagle" @mouseover.prevent="showBar = true"
            @mouseout.prevent="showBar = false" :style="{ left: (leftWidth - 4) + 'px', opacity: opacityVal }"
            :class="{ 'dragging': isDragging }" v-show="resizeAll">
            <div class="resize-handle" v-if="showBar || isDragging">
                <div class="handle-dot"></div>
                <div class="handle-dot"></div>
                <div class="handle-dot"></div>
            </div>
        </div>
        <div class="xbsjRight" :style="{ width: `calc(100% - ${leftWidth}px)` }"
            :class="(!resizeAll) ? 'xbsjResize-all' : ''">
            <slot name="earth"></slot>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
defineProps({
    resizeAll: {
        type: Boolean,
        required: false,
        default: true
    },

})
const leftWidth = ref(800)
const showBar = ref(false)
const isDragging = ref(false)

const dragEagle = (e) => {
    if (!showBar.value) return
    e.preventDefault()
    e.stopPropagation()
    isDragging.value = true
    const startX = e.clientX
    const startWidth = leftWidth.value
    
    const handleMouseMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const deltaX = e.clientX - startX
        const newWidth = startWidth + deltaX
        
        // 设置最小和最大宽度限制
        const minWidth = 300
        const maxWidth = window.innerWidth - 300
        
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            leftWidth.value = newWidth
        }
    }
    
    const handleMouseUp = (e) => {
        e.preventDefault()
        e.stopPropagation()
        isDragging.value = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
    
    // 阻止iframe的默认行为
    document.addEventListener('mousemove', handleMouseMove, { passive: false })
    document.addEventListener('mouseup', handleMouseUp, { passive: false })
    
    // 添加全局样式，确保拖拽时iframe不干扰
    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'none'
    
    // 恢复样式
    const restoreStyles = () => {
        document.body.style.userSelect = ''
        document.body.style.pointerEvents = ''
    }
    
    document.addEventListener('mouseup', restoreStyles, { once: true })
}
const opacityVal = computed(() => {
    if (showBar.value) {
        return 1
    } else {
        return 0
    }
})

// 响应式处理窗口大小变化
const handleResize = () => {
    const maxWidth = window.innerWidth - 300
    if (leftWidth.value > maxWidth) {
        leftWidth.value = maxWidth
    }
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.xbsj-box {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
}

.xbsjLeft {
    height: 100%;
    background-color: #001921;
}

.xbsjResize {
    width: 8px;
    position: absolute;
    z-index: 10;
    height: 100%;
    border: none;
    background-color: #004052;
    cursor: col-resize;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    /* 确保拖拽条在iframe之上 */
    pointer-events: auto;
}

.xbsjResize:hover {
    background-color: #0066cc;
    width: 12px;
    margin-left: -4px;
}

.xbsjResize.dragging {
    background-color: #0066cc;
    cursor: col-resize;
    width: 12px;
    margin-left: -4px;
    box-shadow: 0 0 10px rgba(0, 102, 204, 0.5);
}

.resize-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.handle-dot {
    width: 3px;
    height: 3px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0.8;
}

.xbsjRight {
    height: 100%;
}

.xbsjResize-all {
    width: 100% !important;
    height: 100% !important;
}
</style>
