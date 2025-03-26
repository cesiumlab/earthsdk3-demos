<script lang="ts" setup name="dlcMessage">
import { onMounted, ref } from 'vue';
const props = defineProps<{
    type: 'success' | 'error' | 'warning' | 'info',
    text: string,
    directive: number
}>()

const isshow = ref(false)
// 定义一个对象，包含4种情况的样式，对象key就是类型字符串
const style = {
    warning: {
        icon: '!',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)',
    },
    error: {
        icon: '✕',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)',
    },
    success: {
        icon: '✓',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)',
    },
    info: {
        icon: 'i',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)',
    },
}
onMounted(() => {
    isshow.value = true
    setTimeout(() => {
        isshow.value = false
    }, props.directive - 500);
})

</script>

<template>
    <transition name="down">
        <div class="dlc-message" :style="style[type]" v-show="isshow" :title="text">
            <div class="iconfont" :style="{ backgroundColor: style[type].color }">{{ style[type].icon }}</div>
            <div class="text">{{ text }}</div>
        </div>
    </transition>
</template>

<style scoped>
.dlc-message {
    user-select: none;
    width: 210px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -100px;
    top: 30px;
    line-height: 46px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
}

.iconfont {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
}

.text {
    max-width: calc(100% - 50px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.down-enter-from {
    transform: translateY(-30px);
    opacity: 0;
}

.down-enter-to {
    transform: translateY(0px);
}

.down-enter-active,
.down-leave-active {
    transition: all 1s;
}

.down-leave-from {
    transform: translateY(0px);
    opacity: 1;
}

.down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
