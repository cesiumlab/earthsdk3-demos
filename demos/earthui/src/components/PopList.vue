<script setup lang="ts">
import { ElButton } from 'element-plus'
interface Props {
  title?: string
  showButton?: boolean
  link?: string
  leftButton?: string
  showLeftButton?: boolean
  rightButton?: string
}
withDefaults(defineProps<Props>(), {
  title: '设置',
  showButton: false,
  link: '',
  leftButton: '取消',
  rightButton: '确认',
  showLeftButton: false
})
const emits = defineEmits(['close', 'ok'])
</script>
<template>
  <div class="poplist">
    <div class="poplist_head">
      <div class="roam_custom_head_left"><span></span>{{ title }}</div>
      <div class="roam_custom_head_right" v-show="link">
        <a :href="`${link}`" target="_blank"> {{ link }}</a>
      </div>
    </div>
    <div class="poplist_content">
      <slot></slot>
    </div>
    <div class="poplist_footer" v-if="showButton">
      <el-button @click="emits('close')" v-if="showLeftButton">
        {{ leftButton }}
      </el-button>
      <el-button type="primary" @click="emits('ok')">
        {{ rightButton }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.poplist {
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 5px;
  background-color: var(--el-bg-color-page);
  border-radius: 8px;
}

.poplist_head {
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 0 10px;
  border-bottom: var(--el-border);
  font-size: 12px;
}

.roam_custom_head_left {
  position: relative;
  color: var(--el-text-color);
  user-select: none;
}

.roam_custom_head_left>span {
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  background: var(--el-color-primary);
}

.roam_custom_head_right {
  color: var(--el-text-color);
  padding: 3px 10px;
  border-radius: 4px;
  /* max-width: 100px; */
  overflow: hidden;
}

.roam_custom_head_right>a {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
  font-size: 12px;
  color: var(--el-text-color);
  text-decoration: none;
}

.poplist_content {
  padding: 10px;
}

.poplist_footer {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  justify-content: flex-end;
}

/* .poplist_footer>button {
  width: 80px;
  height: 32px;
  background: var(--el-bg-color);
  border-radius: 4px;
  border: var(--el-border);
  cursor: pointer;
  color: var(--el-text-color);
  margin-left: 20px;
} */

/* .poplist_footer>button:hover {
  border: 1px solid var(--el-color-primary);
} */
</style>
