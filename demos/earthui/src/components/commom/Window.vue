<script setup lang='ts'>
import { nextTick, reactive, ref, watch } from 'vue';
const props = withDefaults(defineProps<{
    show?: boolean,
    title?: string,
    okText?: string,
    cancelText?: string,
    onlyButton?: boolean,
    readonly?: boolean,
    width?: number,
    height?: number,
    isFocus?: boolean,
    minWidthHeight?: number[]
}>(), {
    modelValue: true,
    title: '设置',
    okText: '确认',
    cancelText: '取消',
    onlyButton: false,
    readonly: false,
    width: 700,
    height: 400,
    isFocus: true,
    minWidthHeight: () => [300, 70]
});
const emits = defineEmits(['ok', 'cancel']);

const containerStyle = reactive({ width: 700, height: 400, top: 0, left: 0 })
const container = ref<HTMLDivElement>()
const isdragEagle = ref(false)
const isFirst = ref(true)

const domStyle = ref({ width: '700px', height: '400px', top: 'calc(50% - 200px)', left: 'calc(50% - 350px)' })

const defaultStyle = () => {
    const body = document.body
    const uiWidth = body.clientWidth;
    const uiHeight = body.clientHeight;
    const top = uiHeight / 2 - props.height / 2;
    const left = uiWidth / 2 - props.width / 2;
    containerStyle.width = props.width
    containerStyle.height = props.height
    containerStyle.top = top
    containerStyle.left = left
}

const initStyle = async () => {
    await nextTick()
    if (!container.value) return
    if (isFirst.value) {
        defaultStyle()
        isFirst.value = false
    }
    setPosition()
    setSize()
}

const setPosition = async () => {
    await nextTick()
    if (!container.value) return
    const { top, left } = containerStyle
    domStyle.value.top = top + 'px'
    domStyle.value.left = left + 'px'
}

const setSize = async () => {
    await nextTick()
    if (!container.value) return
    const { width, height } = containerStyle
    domStyle.value.width = width + 'px'
    domStyle.value.height = height + 'px'
}

watch(() => props.show, (val) => {
    if (!val) return
    initStyle()
})

const escCancel = () => {
    if (!props.onlyButton) {
        emits('cancel')
    } else {
        emits('ok')
    }
}

const vFocus = {
    beforeMount: (el: HTMLInputElement) => {
        nextTick(() => {
            if (!props.isFocus) return
            el.focus()
        });
    }
}

const dragEagle = (e: MouseEvent) => {
    if (!container.value) return
    //记录鼠标所在位置
    isdragEagle.value = true
    const navheight = 0
    const dom = document.body
    const maxWidth = dom.clientWidth;
    const maxHeight = dom.clientHeight;
    const box = container.value;
    const disx = e.pageX - box.offsetLeft;
    const disy = e.pageY - box.offsetTop;
    document.onmousemove = function (e: MouseEvent) {
        if (!container.value) return
        e.stopPropagation();
        let left = e.pageX - disx;
        let top = e.pageY - disy;
        if (left > 0 && left <= maxWidth - containerStyle.width) {
            containerStyle.left = left;
        } else if (left <= 0 && containerStyle.left < left) {
            containerStyle.left = left;
        } else if (left > maxWidth - containerStyle.width && containerStyle.left > left) {
            containerStyle.left = left;
        }
        if (top > navheight && top <= maxHeight - containerStyle.height) {
            containerStyle.top = top;
        } else if (top <= navheight && containerStyle.top < top) {
            containerStyle.top = top;
        } else if (top > maxHeight - containerStyle.height && containerStyle.top > top) {
            containerStyle.top = top;
        }
        setPosition()
    }
    document.onmouseup = function () {
        isdragEagle.value = false
        document.onmousemove = null
        document.onmouseup = null
    }
}

const resize = (e: MouseEvent) => {
    if (!container.value) return
    isdragEagle.value = true
    const dom = document.body
    const maxWidth = dom.clientWidth - containerStyle.left;
    const maxHeight = dom.clientHeight - containerStyle.top;

    document.onmousemove = function (e: MouseEvent) {
        e.stopPropagation();
        //计算当前鼠标位置和全局点击位置的偏插值，尝试修改宽度和高度
        const w = e.movementX + containerStyle.width;
        const h = e.movementY + containerStyle.height;

        if (w >= props.minWidthHeight[0] && w <= maxWidth) {
            containerStyle.width = w;
        }
        if (h >=  props.minWidthHeight[1] && h <= maxHeight) {
            containerStyle.height = h;
        }
        setSize();
    }

    document.onmouseup = function () {
        isdragEagle.value = false
        document.onmousemove = null
        document.onmouseup = null
    }
}

</script>

<template>
    <Transition name="modal">
        <div class="modal-mask" v-if="show" tabindex="0" @keydown.esc="escCancel" v-focus>
            <div class="modal-container" ref="container" :style="domStyle" :class="{ 'modal-box': isdragEagle }">
                <div class="modal-header" @mousedown.stop="dragEagle">
                    {{ title }}
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>

                <div class="modal-footer">
                    <button @click="emits('cancel')" v-show="!onlyButton">{{ cancelText }}</button>
                    <button @click="emits('ok')" :disabled="readonly" :class="{ 'readonly': readonly }">
                        {{ okText }}</button>
                    <i @mousedown.stop="resize" class="bar"></i>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    outline: none;
    transition: opacity 0.2s ease;
}

.modal-container {
    position: fixed;
    color: #fff;
    z-index: 99999;
    overflow: hidden;
    pointer-events: all;
    transition: all 0.2s ease;
    min-width: 300px;
    min-height: 70px;
    background: rgba(37, 38, 42, 1)
}

.modal-box {
    transition: none !important;
}

.modal-header {
    width: 100%;
    height: 32px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
    user-select: none;
    cursor: all-scroll;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(27, 27, 27, 1);
    ;
}

.modal-body {
    width: 100%;
    height: calc(100% - 70px);
    overflow: auto;
}

.modal-footer {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.bar {
    position: absolute;
    height: 10px;
    width: 10px;
    bottom: 0px;
    right: 0px;
    cursor: nw-resize;
}

.modal-footer>button {
    width: 80px;
    height: 32px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
}

.modal-footer>button:hover {
    border: 1px solid #2c68f7;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.readonly {
    cursor: no-drop !important;
    background-color: #4c4c4c !important;
}
</style>
