<template>
    <div class="scene-tree-wrapper">
        <div class="scene-tree-comp">
            <SceneTreeComp :sceneTree="sceneTree">
            </SceneTreeComp>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SceneTree } from "earthsdk3";
import SceneTreeComp from "./SceneTree.vue";
withDefaults(defineProps<{ sceneTree: SceneTree }>(), {});
</script>

<style scoped>
.scene-tree-wrapper {
    min-width: 260px;
    background: #00212b;
    outline: none;
    height: 30%;
}

.scene-tree-comp {
    width: 100%;
    height: calc(100% - 30px);
}
</style>
