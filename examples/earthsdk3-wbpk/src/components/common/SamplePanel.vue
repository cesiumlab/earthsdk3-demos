<template>
    <Transition name="nav">
        <div class="m-navba" v-if="props.isShow" :style="{ width: leftWidth + 'px' }">
            <div class="navba_hd">
                <div style="margin-left: 20px;">{{ propertyName ?? '示例文档' }}</div>
                <div class="close" @click="changeOk">
                    ✕
                </div>
            </div>
            <div class="navba_box">
                <MarkdownReader :markdown-str="jsonStr"></MarkdownReader>
            </div>
            <div class="resize" @mousedown="dragEagle" @mouseover.prevent="showBar = true"
                @mouseout.prevent="showBar = false" :style="{ opacity: showBar ? 1 : 0 }">
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MarkdownReader from './MarkdownReader.vue';

const props = withDefaults(defineProps<{
    jsonStr: string,
    propertyName?: string
    isShow: boolean
}>(), {});
const emits = defineEmits(["changeShow"]);

const changeOk = () => {
    emits("changeShow", false);
}

const leftWidth = ref(500)
const showBar = ref(false)
const dragEagle = (e: MouseEvent) => {
    if (!showBar.value) return
    const leftDomWidth = leftWidth.value
    const startX = e.clientX
    onmousemove = function (e) {
        e.preventDefault()
        const distX = Math.abs(e.clientX - startX)
        if (e.clientX > startX) {
            leftWidth.value = leftDomWidth - distX
        } else {
            leftWidth.value = leftDomWidth + distX
        }
    }
    onmouseup = function () {
        onmousemove = null
    }
}

</script>
<style scoped>
.m-navba {
    position: fixed;
    right: 0;
    top: 30px;
    height: 100%;
    background-color: #00212b;
    z-index: 999;
}

.navba_hd {
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #143b46;
    color: #fff;
}

.navba_box {
    width: 100%;
    height: calc(100% - 30px);
}

.close {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
}

.close:hover {
    color: #49ec12;
}

.nav-leave-to,
.nav-enter {
    transform: translateX(500px);
}


.nav-enter-active,
.nav-leave-active {
    transition: all 0.1s ease;
}

.nav-enter-to,
.nav-leave {
    transform: translateX(0px);
}

.resize {
    width: 2px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
    height: 100%;
    border: none;
    background-color: #004052;
    cursor: col-resize;
    transition: opacity 0.2s ease;
}
</style>
