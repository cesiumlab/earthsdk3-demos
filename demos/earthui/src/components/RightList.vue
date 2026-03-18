<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  title?: string
  isTop?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '设置',
  isTop: false
})
const developContent = ref(true)
</script>
<template>
  <div class="relative">
    <div class="relative_type" @click.stop="developContent = !developContent" :class="{ relative_type_top: isTop }">
      <span class="relative_type_title">{{ title }}</span>
      <span class="develop_icon">
        <es-icon :name="'shouqi'" style="transition: 0.5s;" :class="developContent ? '' : 'icon_transform'" />
      </span>
    </div>
    <es-fold :show="developContent">
      <div class="relative_box">
        <slot></slot>
      </div>
    </es-fold>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.relative_type {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-regular);
  white-space: nowrap;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  user-select: none;
  border-top: var(--el-border);
  cursor: pointer;
}

.relative_type_top {
  border-top: none;
}

.relative_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: auto;
}

.develop_icon {
  display: inline-block;
  cursor: pointer;
  color: var(---el-text-color-regular);
  font-size: 12px;
}

.icon_transform {
  transform: rotate(-180deg);
}
</style>
