<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  title?: string
  name?: string
  color?: string
  content?: string
  actived?: boolean
  disabled?: boolean
  showSpan?: boolean
  size?: number
  leftButton?: boolean
  fontSize?: number
  click: () => void
  spanClick?: () => void
}
const props = withDefaults(defineProps<Props>(), {
  title: '设置',
  name: 'tishi',
  color: 'rgba(58, 118, 229, 1)',
  content: '按钮',
  actived: false,
  disabled: false,
  showSpan: false,
  size: 20,
  leftButton: false,
  fontSize: 14
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
  <div class="right_button" :class="{
    active: actived,
    disable: disabled,
    right_button_left: leftButton
  }" @click.prevent.stop="click()" @mouseover="spanIsShow = true" @mouseout="spanIsShow = false">
    <div class="right_button_icon">
      <es-icon :name="name" />
    </div>
    <div class="right_button_content" :style="{ fontSize: `${fontSize}px` }">
      {{ content }}
    </div>
    <span v-show="spanIsShow && showSpan" class="xiaosanjiao" :class="xiaosanjiao ? '' : 'xiaosanjiao_transform'"
      @click.stop.prevent="xiaosanjiaoClick()"></span>
  </div>
</template>

<style scoped>
.right_button {
  width: 120px;
  height: 36px;
  background: var(--el-bg-color);
  border-radius: 8px;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  user-select: none;
  border: var(--el-border);
  margin: 0 0 10px 10px;
  color: var(--el-text-color);
  transition: all 0.3s;
}

.right_button>.right_button_content {
  margin-left: 5px;
}

.right_button>.right_button_icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
}

.right_button:hover {
  border: 1px solid var(--el-color-primary);
}

.xiaosanjiao {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 10px;
  top: 15px;
  transition: 0.5s;
  background-image: url(../assets/right/xiaosanjiaoshouqi.svg);
  background-size: 100% 100%;
}

.xiaosanjiao_transform {
  transform: rotate(-90deg);
}

.active {
  /* box-shadow: inset 0px 0px 11px 2px #2c68f75c; */
  box-shadow: inset 0px 0px 11px 2px var(--el-color-primary-light-7);
  border: 1px solid var(--el-color-primary);
  color: var(--el-text-color);
}

.disable {
  background: rgba(28, 28, 29, 0.6);
  box-shadow: none;
  border: 1px solid rgba(28, 28, 29, 0.6);
  color: #58585d;
  pointer-events: none;
}
</style>
