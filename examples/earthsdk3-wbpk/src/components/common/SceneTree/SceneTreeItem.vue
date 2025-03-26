<template>
  <SceneTreeItemInner v-if="enabled" :showCheckBox="props.showCheckBox" :sceneTreeItem="props.sceneTreeItem"
    @contexMenuEvent="sceneUiTreeObject => emits('contexMenuEvent', sceneUiTreeObject)"
    :isLastSelectedObject="props.isLastSelectedObject" :tree="props.tree">
  </SceneTreeItemInner>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { SceneTree, SceneTreeItem } from "earthsdk3";
import { createVueDisposer } from '../../tools';
import SceneTreeItemInner from './SceneTreeItemInner.vue';

const emits = defineEmits<{
  (e: 'contexMenuEvent', currentSceneTreeItem: SceneTreeItem): void;
}>()

const props = withDefaults(defineProps<{
  sceneTreeItem: SceneTreeItem;
  showCheckBox: boolean;
  isLastSelectedObject: boolean;
  tree: SceneTree;
}>(), {
  showCheckBox: false,
})

const enabled = ref(false);
enabled.value = !props.sceneTreeItem.isDestroyed();

const { sceneTreeItem, isLastSelectedObject, tree } = props;
const disposer = createVueDisposer(onBeforeUnmount);

disposer.dispose(sceneTreeItem.toDestroyEvent.disposableWeakOn(() => {
  // destroy还没有执行完，isDestroyed()可能是false!
  // enabled.value = !props.sceneTreeItem.isDestroyed();
  enabled.value = false;
}));

</script>

<style src="../../css/SceneTreeItem.css" scoped></style>
