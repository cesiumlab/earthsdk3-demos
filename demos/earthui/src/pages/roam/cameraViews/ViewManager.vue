<template>
  <div class="view_panel">
    <div class="view-header-wrapper">
      <div class="view-header" @click.stop="addView()">
        <span class="add-icon">
          <es-icon name="add" />
        </span>
        <span class="view-title">添加视角</span>
      </div>
      <div class="play" :class="{ active: loopplying }" @click.stop="loopplying = !loopplying"
        :title="loopplying ? '暂停' : '播放'">
        <es-icon :name="loopplying ? 'zanting' : 'bofang'" />
      </div>
    </div>

    <div class="view-content">
      <div class="view_item" :class="{ view_selected: currentViewIndex === index }" v-for="(item, index) in viewsRef"
        :key="index" @click.stop="flyInByIndex(index)">
        <img class="view_item_img" :src="item.thumbnail" alt="" :title="item.name" />

        <div class="view_item_info">
          <input v-if="editingIndex == index" @click.stop="" type="text" v-model="item.name" :title="item.name"
            @blur="editingChange(item.name, index)" @keydown.enter="handleEnterKey"
            :ref="(el) => setInputRef(el, index)" class="view_item_input" />
          <span class="view_item_text" v-else>{{ item.name }}</span>
        </div>

        <div class="view_item_actions">
          <es-icon @click.stop="updateView(index)" :name="'gengxin'" :size="16" title="更新视角" />
          <es-icon @click.stop="startEditing(index)" :name="'biaohui'" :size="16" title="编辑名称" />
          <es-icon @click.stop="deleteViewer(index)" :name="'guanbi'" :size="16" title="删除视角" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { messageBox, createVueDisposer, toVR } from 'earthsdk-ui'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ESJViewInfo } from 'earthsdk3'
import { inject, onBeforeUnmount, ref, nextTick } from 'vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { cameraViewsManager } = xbsjEarthUi
const emits = defineEmits(['close'])
const currentDeleteIndex = ref(-1)
const editingIndex = ref(-1)

const deleteViewer = (index: number) => {
  currentDeleteIndex.value = index
  ElMessageBox.confirm('确认删除视角？').then(() => {
    deleteViewConfirm();
  }).catch((err) => {
    console.error(err)
  })
}
// 添加一个标志来防止重复调用
const isProcessingEdit = ref(false)

const editingChange = (name: string | undefined, index: number) => {
  if (isProcessingEdit.value) return // 如果正在处理编辑，直接返回

  isProcessingEdit.value = true
  editingIndex.value = -1
  cameraViewsManager.resetViewName(index, name ?? '视角')
  ElMessage.success('编辑成功')

  // 重置标志
  setTimeout(() => {
    isProcessingEdit.value = false
  }, 100)
}

const handleEnterKey = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement
  const index = editingIndex.value
  if (index !== -1) {
    editingChange(target.value, index)
  }
}

// 存储输入框引用
const inputRefs = ref<{ [key: number]: HTMLInputElement }>({})

const setInputRef = (el: any, index: number) => {
  if (el) {
    inputRefs.value[index] = el
  }
}

const startEditing = (index: number) => {
  editingIndex.value = index
  // 等待DOM更新后聚焦输入框
  nextTick(() => {
    const input = inputRefs.value[index]
    if (input) {
      input.focus()
      input.select() // 选中所有文本
    }
  })
}
const d = createVueDisposer(onBeforeUnmount)
const viewsRef = toVR<ESJViewInfo[]>(d, [cameraViewsManager, 'views']) //视角数组
const loopplying = toVR<boolean>(d, [cameraViewsManager, 'playing']) //视角数组
const currentViewIndex = toVR<number>(d, [cameraViewsManager, 'currentViewIndex']) //视角数组
cameraViewsManager.intervalTime = 2

/**
 * 删除视角
 */
const deleteViewConfirm = () => {
  cameraViewsManager.deleteView(currentDeleteIndex.value)
  currentDeleteIndex.value = -1
  ElMessage.success('删除成功')
}

/**
 * 飞行定位
 * @param index
 */
const flyInByIndex = (index: number) => {
  cameraViewsManager.setCurrentView(index)
  cameraViewsManager.flyToView(index)
}

/**
 * 添加视角
 */
const addView = () => {
  changeToMap()
  cameraViewsManager.addView()
  ElMessage.success('添加成功')
}

/**
 * 切换到地图模式
 */
const changeToMap = () => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer.changeToMap()
  xbsjEarthUi.roamMode = 'Map'
}

const updateView = (index: number) => {
  cameraViewsManager.update(index)
  ElMessage.success('视角更新')
}
</script>

<style scoped lang="scss">
.view_panel {
  width: 100%;
  font-size: var(--el-font-size-base);
  margin: 10px;
}

.view-header-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.view-header {
  flex: 1;
  height: 34px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  text-align: center;
  border-radius: var(--el-border-radius-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--el-transition-duration);
  color: var(--el-text-color);

  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);

    .add-icon,
    .view-title {
      color: var(--el-color-primary);
    }

  }
}

.add-icon {
  font-size: 14px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  color: var(--el-text-color);
}

.view-title {
  font-size: var(--el-font-size-base);
  font-weight: var(--el-font-weight-primary);
  color: var(--el-text-color);
  line-height: 1.5;
}

.play {
  width: 34px;
  font-size: 12px;
  height: 34px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: var(--el-border-radius-base);
  transition: all var(--el-transition-duration);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  color: var(--el-text-color);

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
}

.play.active {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

.view-content {
  overflow-y: auto;
  max-height: 400px;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--el-border-color);
    border-radius: 2px;
  }
}

.view_item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 5px 10px;
  background-color: var(--el-bg-color-page);
  border: var(--el-border);
  border-radius: var(--el-border-radius-base);
  transition: all 0.25s ease;

  &:hover {
    // background-color: var(--el-fill-color-light);
    border-color: var(--el-color-primary-light-3);
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .view_item_actions {
      opacity: 1;
    }
  }

  &:active {
    transform: translateX(2px);
  }
}

.view_item_img {
  width: 100px;
  height: 30px;
  border-radius: var(--el-border-radius-base);
  object-fit: cover;
  border: 1px solid var(--el-border-color-light);
  flex-shrink: 0;
  transition: all 0.3s ease;

  .view_item:hover & {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

.view_item_info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

.view_item_text {
  width: 100%;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--el-text-color-primary);
  font-size: var(--el-font-size-base);
}

.view_item_input {
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid var(--el-color-primary);
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
  padding: 0 10px;
  border-radius: var(--el-border-radius-small);
  font-size: var(--el-font-size-base);

  &:focus {
    border-color: var(--el-color-primary);
    box-shadow: 0 0 0 2px var(--el-color-primary-light-8);
  }

  &::placeholder {
    color: var(--el-text-color-placeholder);
  }
}

.view_item_actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.25s ease;

  :deep(.es-icon) {
    color: var(--el-text-color-secondary);
    transition: all 0.2s ease;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-fill-color-light);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.view_selected {
  background-color: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary);
  box-shadow: 0 0 12px 0 var(--el-color-primary-light-5);

  &:hover {
    background-color: var(--el-color-primary-light-8);
  }

  .view_item_text {
    color: var(--el-color-primary);
    font-weight: var(--el-font-weight-primary);
  }

  .view_item_actions {
    opacity: 1;

    :deep(.es-icon) {
      color: var(--el-color-primary);
    }
  }
}
</style>
