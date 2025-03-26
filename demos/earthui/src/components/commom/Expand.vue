<template>
    <div class="dragEagle-box" ref="targetDiv">
        <div style=" width: 100%;height:100%;">
            <slot></slot>
        </div>
        <div class="resize-x" v-show="showResize" :class="dragEnableY ? '' : 'resize-none'" @mousedown="dragEagleY"
            @mouseover.prevent="showBar = true" @mouseout.prevent="showBar = false" :style="{ opacity: opacityVal }">
        </div>
        <div class="resize-y" v-show="showResize" :class="dragEnableX ? '' : 'resize-none'" @mousedown="dragEagleX">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
const props = withDefaults(defineProps<{ showResize?: boolean, dragEnableX?: boolean, dragEnableY?: boolean }>(),
    { showResize: true, dragEnableX: true, dragEnableY: true });

const targetDiv = ref<HTMLElement>()

const showBar = ref(false)
const opacityVal = computed(() => {
    if (showBar.value) {
        return 1
    } else {
        return 0
    }
})


const dragEagleY = (e: MouseEvent) => {
    if (!targetDiv.value || !props.dragEnableY) {
        return
    }
    const targetDivHeight = targetDiv.value.offsetHeight
    const startY = e.clientY
    document.onmousemove = function (e) {
        if (!targetDiv.value || !props.dragEnableY) {
            return
        }
        e.preventDefault()
        const distY = Math.abs(e.clientY - startY)
        //往下方拖动：
        if (e.clientY > startY) {
            targetDiv.value.style.height = targetDivHeight + distY + 'px'
        } else {
            targetDiv.value.style.height = targetDivHeight - distY + 'px'
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null
    }
}
const dragEagleX = (e: MouseEvent) => {
    if (!targetDiv.value || !props.dragEnableX) {
        return
    }
    const targetDivWidth = targetDiv.value.offsetWidth
    const startX = e.clientX
    document.onmousemove = function (e) {
        if (!targetDiv.value || !props.dragEnableX) {
            return
        }
        e.preventDefault()
        const distX = Math.abs(e.clientX - startX)
        //往→方拖动：
        if (e.clientX > startX) {
            targetDiv.value.style.width = targetDivWidth + distX + 'px'
        } else {
            targetDiv.value.style.width = targetDivWidth - distX + 'px'
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null
    }
}

const autoHeight = () => {
    if (!targetDiv.value) {
        return
    }
    targetDiv.value.style.height = 'auto'
}

watch(() => props.showResize, autoHeight)

</script>
 
<style scoped>
.dragEagle-box {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: relative;
    overflow: hidden;
}
.resize-x {
    transition: opacity 0.2s ease;
    width: 100%;
    height: 4px;
    cursor: row-resize;
    position: absolute;
    background-color: rgba(0,0,0,0.51);
    bottom: -1px;
}

.resize-none {
    cursor: default !important;
}

.resize-y {
    width: 6px;
    height: 100%;
    cursor: col-resize;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
