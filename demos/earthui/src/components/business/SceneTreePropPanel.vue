<template>
    <!-- 新场景树 -->
    <DraggableDialog :title="'属性面板'" v-model="showPropView" :leftTop="[5, 460]" :widthHeight="[300, 400]"
        :minWidthHeight="[300, 400]">
        <template #prefix>
            <ESIcon name="yinqing"></ESIcon>
        </template>
        <PropTree :key="propTreeKey" v-if="propSceneTree && propSceneTree.sceneObject"
            :sceneObject="propSceneTree.sceneObject">
        </PropTree>
    </DraggableDialog>
</template>

<script setup lang="ts">
import { createVueDisposer, DraggableDialog, ESIcon, PropTree, toRefKey, toVR } from 'earthsdk-ui'
import { SceneTreeItem } from 'earthsdk3'
import { inject, onBeforeUnmount } from 'vue'
import type { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
// 注入父组件提供的依赖
const xbsjEarthUi = inject<XbsjEarthUi>('xbsjEarthUi')!

// 场景树显示状态（双向绑定）
const disposer = createVueDisposer(onBeforeUnmount);
const propSceneTree = toVR<SceneTreeItem | undefined>(disposer, [xbsjEarthUi, 'propSceneTree']);
const showPropView = toVR<boolean>(disposer, [xbsjEarthUi, 'showPropView']);
const propTreeKey = toRefKey(propSceneTree);

</script>
