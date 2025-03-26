<template>
    <div class="dialog" @click="touchOutside" ref="dialogBox">
        <transition name="down">
            <div ref="refContent" v-show="showRef" class="dialog-content" :style="style">
                <div class="dialog-title">
                    <span>{{ title }}</span>
                    <span class="dialog-close" @click="close">✕</span>
                </div>
                <div class="content">{{ content }}</div>
                <div v-if="editable" class="t-input">
                    <input ref="tInput" v-model="inputContent" type="text" placeholder="" class="t-input__inner" />
                </div>
                <div class="footer">
                    <button v-if="cancelText.length > 0" @click="results(false)" class="btn-cancel">{{ cancelText
                    }}</button>
                    <button v-if="sureText.length > 0" @click="results(true)" class="btn-confirm">{{ sureText
                    }}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, nextTick, ref, StyleValue } from 'vue'
import Confirm from '.'
const props = withDefaults(defineProps<{
    title?: string, content?: string, left?: number, top?: number, cancelText?: string,
    sureText?: string, editable?: boolean, canceledOnTouchOutside?: boolean,
    result?: Function, width?: number, height?: number
}>(), {
    title: '提示',
    content: '确定要删除该数据吗?',
    left: 0,
    top: 0,
    cancelText: '取消',
    sureText: '确定',
    editable: false,
    canceledOnTouchOutside: true,
    width: 400,
    height: 160
});

const refContent = ref<HTMLElement | null>(null)
const dialogBox = ref<HTMLElement | null>(null)
const style = computed(() => {
    let style: Partial<StyleValue> = {}
    if (props.left || props.top) {
        style.position = 'absolute'
        let cw = document.documentElement.clientWidth
        let ch = document.documentElement.clientHeight
        // 弹窗的宽高
        let contentH = refContent.value?.offsetHeight || 0
        let contentW = refContent.value?.offsetWidth || 0
        let offset = 30 // 调整间隔
        if (props.left < (cw * 1) / 3) {
            // 鼠标点击在屏幕左侧，弹窗要显示在右侧
            style.left = props.left + offset + 'px'
            let top = props.top
            if (ch - top < contentH) top = ch - contentH // 如果鼠标距离最底部 的距离小于弹窗高度
            style.top = top + 'px'
        } else if (props.left > (cw * 1) / 3 && props.left < (cw * 2) / 3) {
            if (props.top < ch / 2) {
                // 鼠标在中间上方点击 则弹窗在正下方显示
                style.top = props.top + offset + 'px'
            } else {
                // 鼠标在中间下方点击 则弹窗在正上方显示
                style.top = props.top - contentH - offset + 'px'
            }
            style.left = props.left - contentW / 2 + 'px'
        } else {
            // 点击屏幕右侧
            style.left = props.left - contentW - offset + 'px'
            let top = props.top
            if (ch - top < contentH) top = ch - contentH // 如果鼠标距离最底部 的距离小于弹窗高度
            style.top = top + 'px'
        }
    } else {
        style.top = `calc(20% - ${props.height / 2}px)`
        style.left = `calc(50% - ${props.width / 2}px)`
        style.width = `${props.width}px`
        style.height = `${props.height}px`
    }
    return style
})

const inputContent = ref('')
const tInput = ref<HTMLElement | null>(null)
const showRef = ref(false)

onMounted(() => {
    setTimeout(() => showRef.value = true, 50)
    if (props.editable) setTimeout(() => tInput.value?.focus(), 50)

    window.addEventListener('keydown', escEnter)
    onBeforeUnmount(() => {
        window.removeEventListener('keydown', escEnter)
    })
})

const touchOutside = (e: any) => {
    if (!props.canceledOnTouchOutside) return
    if (e.target?.classList?.length && e.target.classList[0] == 'dialog') close()
}
const close = () => Confirm.close()

const results = (isSure: boolean) => {
    if (props.result) props.result({ content: inputContent.value, confirm: isSure })
    close()
}

const escEnter = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
    if (e.key === 'Enter') results(true)
}
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1024;
    background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
    color: #fff;
    position: absolute;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
    background-color: #00212b;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ffffff96;
}

.dialog-title {
    padding: 0 20px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
}

.dialog-close {
    width: 20px;
    height: 20px;
    text-align: center;
    user-select: none;
    display: inline-block;
    font-weight: normal;
}

.dialog-close:hover {
    font-weight: 700;
    cursor: pointer;
}

.content {
    letter-spacing: 2px;
    font-size: 14px;
}

button {
    /* user-select: none;
    width: 70px;
    height: 30px;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #0d2b34;
    color: #fff;
    background-color: #0d2b34;
    letter-spacing: 2px; */
    user-select: none;
    width: 110px;
    height: 30px;
    margin: 0px 20px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid #384b50;
    color: #fff;
    background-color: #0d2b34;
}

button:hover {
    background-color: #00212b;
}

.dialog-content>div {
    margin-top: 10px;
}

.t-input {
    font-size: 14px;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.t-input__inner {
    -webkit-appearance: none;
    background-color: #065164;
    background-image: none;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 90%;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 40px;
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
    transition: all 0.5s;
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
