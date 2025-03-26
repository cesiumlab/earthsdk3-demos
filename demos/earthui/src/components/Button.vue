
<script setup lang='ts'>
import { onMounted, ref } from "vue";
interface Props {
    title?: string,
    name?: string,
    color?: string,
    content?: string,
    actived?: boolean,
    disabled?: boolean
    showSpan?: boolean,
    size?: number,
    leftButton?: boolean,
    click: () => void,
    spanClick?: () => void
}
const props = withDefaults(defineProps<Props>(), {
    title: "设置",
    name: 'tishi',
    color: 'rgba(58, 118, 229, 1)',
    content: '按钮',
    actived: false,
    disabled: false,
    showSpan: false,
    size: 20,
    leftButton: false
})
const xiaosanjiao = ref(true)
const spanIsShow = ref(false)
const xiaosanjiaoClick = () => {
    xiaosanjiao.value = !xiaosanjiao.value
    if (props.showSpan && props.spanClick) {
        props.spanClick()
    }
}
</script>
<template>
    <div class="right_button" :class="{ 'active': actived, 'disable': disabled, 'right_button_left': leftButton }"
        @click.prevent.stop="click()" @mouseover="spanIsShow = true" @mouseout="spanIsShow = false">
        <div class="right_button_icon"><es-icon :name="name" :color="color" :size="size" /></div>
        <div class="right_button_content">{{ content }}</div>
        <span v-show="spanIsShow && showSpan" class="xiaosanjiao" :class="xiaosanjiao ? '' : 'xiaosanjiao_transform'"
            @click.stop.prevent="xiaosanjiaoClick()"></span>
    </div>
</template>

<style scoped>
.right_button {
    width: 120px;
    height: 36px;
    background: rgba(28, 28, 30, 0.9);
    border-radius: 8px;
    display: flex;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    user-select: none;
    border: 1px solid rgba(183, 183, 183, 0.22);
    margin: 0 0 10px 10px;
    color: rgba(230, 230, 230, 1);
}

.right_button_left {
    margin: 0 0 10px 15px;
}

.right_button>.right_button_content {
    margin-left: 5px;
    font-size: 14px;

}

.right_button>.right_button_icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.right_button:hover {
    border: 1px solid #2C68F7;
}

.xiaosanjiao {
    width: 6px;
    height: 6px;
    position: absolute;
    right: 10px;
    top: 15px;
    transition: .5s;
    background-image: url(../assets/right/xiaosanjiaoshouqi.svg);
    background-size: 100% 100%;
}

.xiaosanjiao_transform {
    transform: rotate(-90deg);
}

.active {
    background: #1C1C1E;
    box-shadow: inset 0px 0px 11px 2px #2C63E4;
    border: 1px solid #2C68F7;
    color: rgba(255, 255, 255, 1);
}

.disable {
    background: rgba(28, 28, 29, 0.60);
    box-shadow: none;
    border: 1px solid rgba(28, 28, 29, 0.60);
    color: #58585D;
    pointer-events: none;
}
</style>
