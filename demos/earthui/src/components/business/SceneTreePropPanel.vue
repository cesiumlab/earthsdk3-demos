<template>
    <!-- 新场景树 -->
    <DraggableDialog :title="'属性面板'" v-model="showSceneTreePropViewRef" :leftTop="[320, 150]" :widthHeight="[400, 600]"
        :minWidthHeight="[400, 600]" @close="propSceneTree = undefined">
        <template #prefix>
            <ESIcon name="yinqing"></ESIcon>
        </template>
        <ESPropPanel :tree-item="propSceneTree" :key="propTreeKey"></ESPropPanel>
    </DraggableDialog>
</template>

<script setup lang="ts">
import { createVueDisposer, DraggableDialog, ESIcon, toRefKey, toVR } from 'earthsdk-ui'
import { SceneTreeItem } from 'earthsdk3'
import { computed, inject, onBeforeUnmount } from 'vue'
import type { XbsjEarthUi } from '../../scripts/xbsjEarthUi'
import ESPropPanel from '../eSPropPanel/ESPropPanel.vue'

// 注入父组件提供的依赖
const xbsjEarthUi = inject<XbsjEarthUi>('xbsjEarthUi')!

// 场景树显示状态（双向绑定）
const disposer = createVueDisposer(onBeforeUnmount);
const propSceneTree = toVR<SceneTreeItem | undefined>(disposer, [xbsjEarthUi, 'propSceneTree']);
const propTreeKey = toRefKey(propSceneTree);
const showSceneTreePropViewRef = computed(() => { return !!propSceneTree.value });

</script>
