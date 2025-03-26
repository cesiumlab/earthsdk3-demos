<script setup lang='ts'>
import SceneTreeWrapper from '../components/common/SceneTree/SceneTreeWrapper.vue'
import PropTreeWrapper from '../components/common/PropTree/PropTreeWrapper.vue'
import { getobjm } from '../scripts/getobjm';
import { createVueDisposer, toReadonlyVueRef, toRefKey } from '../components/tools';
import { PropTree } from 'earthsdk3';
import { onBeforeUnmount } from 'vue';
const objm = getobjm();
const { sceneTree, propUiTreeManager } = objm;
const d = createVueDisposer(onBeforeUnmount);
const propTreeRef = toReadonlyVueRef<PropTree | undefined>(d, [propUiTreeManager, 'propTree']);
const propTreeKey = toRefKey(propTreeRef);
</script>
<template>
    <div class="tree_box">
        <SceneTreeWrapper :scene-tree="sceneTree"></SceneTreeWrapper>
        <PropTreeWrapper v-if="propTreeRef" :prop-tree="propTreeRef" :key="propTreeKey"></PropTreeWrapper>
    </div>
</template>

<style scoped>
.tree_box {
    position: fixed;
    width: 300px;
    height: calc(100% - 60px);
    top: 50px;
    left: 10px;
    background: #00212b;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
</style>
