<template>
    <!-- 新场景树 -->
    <DraggableDialog :title="'图层管理'" v-model="showSceneTreeViewRef" :leftTop="[5, 45]" :widthHeight="[300, 400]"
        :minWidthHeight="[300, 450]">
        <template #prefix>
            <ESIcon name="tucengguanli"></ESIcon>
        </template>
        <template #suffix>
            <div class="edit_icon" title="编辑器" :class="{ 'edit_icon_active': showEditingBarRef }"
                @click="showEditingBarRef = !showEditingBarRef">
                <ESIcon name="sanweizuobiao"></ESIcon>
            </div>

            <div class="edit_icon" title="选择器" :class="{ 'edit_icon_active': showCheckbox }" @click="redrawFunc(true)">
                <ESIcon name="weixuanzhong"></ESIcon>
            </div>
        </template>

        <div class="Layer_Management">
            <ESFold :show="showEditingBarRef">
                <div class="Layer_Management_editing">
                    <Editing></Editing>
                </div>
            </ESFold>
            <div class="Layer_Management_scenetree">
                <SceneTree :sceneTree="sceneTree" :showCheckbox="showCheckbox" :config="config" />
            </div>
        </div>
    </DraggableDialog>
</template>

<script setup lang="ts">
import { createVueDisposer, DraggableDialog, ESFold, ESIcon, SceneTree, toVR } from 'earthsdk-ui'
import { SceneTreeItem } from 'earthsdk3'
import { inject, onBeforeUnmount, ref } from 'vue'
import { getDefauleMenuContent } from '../../composables'
import { getTreeItemMenuContent } from '../../composables/useSceneTreeItemMenu'
import { getIcon } from '../../constants'
import type { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import Editing from '../editing/Editing.vue'

// 注入父组件提供的依赖
const xbsjEarthUi = inject<XbsjEarthUi>('xbsjEarthUi')!
const sceneTree = xbsjEarthUi.sceneTree;

// 场景树显示状态（双向绑定）
const disposer = createVueDisposer(onBeforeUnmount)
const showSceneTreeViewRef = toVR<boolean>(disposer, [xbsjEarthUi, 'showSceneTreeView'])

// 编辑栏显示状态
const showEditingBarRef = ref(true)

// 选择器显示状态
const showCheckbox = ref(false)

/**
 * 场景树配置
 */
const config = {
    //节点类型获取图标
    setSceneTreeItemIcon: getIcon,
    //空白区域右键菜单
    setDefaultMenu: () => {
        return getDefauleMenuContent(xbsjEarthUi, sceneTree)
    },
    //节点右键菜单
    setSceneTreeItemMenu: (item: SceneTreeItem) => {
        return getTreeItemMenuContent(xbsjEarthUi, sceneTree, item)
    }
}

/**
 * 重绘场景树
 * @param flag - 是否切换选择器状态
 */
const redrawFunc = (flag: boolean = false) => {
    flag && (showCheckbox.value = !showCheckbox.value)
    const redrawInfo = sceneTree?.uiTree.redrawInfo
    redrawInfo && sceneTree?.uiTree.redrawEvent.emit(redrawInfo)
}
</script>

<style scoped>
.Layer_Management {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.Layer_Management_editing {
    width: 100%;
    height: 60px;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
}

.Layer_Management_scenetree {
    width: 100%;
    flex: 1;
    overflow: auto;
}

.edit_icon {
    width: 24px;
    height: 24px;
    border-radius: var(--el-border-radius-small, 2px);
    color: var(--el-text-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    margin-left: 4px;

    &:hover {
        background-color: var(--el-fill-color-light);
    }
}

.edit_icon_active {
    color: var(--el-color-primary);
}
</style>
