<template>
  <TreeComp :tree="propTree as unknown as Tree<TreeItem>" @click.self="propTree.uiTree.clearAllSelectedItems()"
    @blur="propTree.uiTree.clearAllSelectedItems()">
    <template v-slot:default="slotProps">
      <PropTreeItemCom :showCheckBox="showCheckBox"
        :treeItem="(slotProps.treeItem as unknown as GroupPropTreeItem | LeafPropTreeItem)" :key="slotProps.key"
        @callback="callback" :tree="propTree">
      </PropTreeItemCom>
    </template>
  </TreeComp>
</template>
<script setup lang="ts">
import TreeComp from "../../Tree.vue";
import { LeafPropTreeItem, GroupPropTreeItem, PropTree } from "earthsdk3";
import { TreeItem, Tree, } from "xbsj-base";
import { PropertyCompCallbackFuncParamsType } from "./Properties/base";
import PropTreeItemCom from "./PropTreeItem.vue";
const props = withDefaults(defineProps<{
  propTree: PropTree;
  showCheckBox: boolean;
}>(), {
  showCheckBox: false,
});
const emits = defineEmits<{
  (e: 'callback', params: PropertyCompCallbackFuncParamsType & { treeItem: GroupPropTreeItem | LeafPropTreeItem, propTree: PropTree }): void;
}>();

const { propTree } = props;

const callback = (params: PropertyCompCallbackFuncParamsType & { treeItem: GroupPropTreeItem | LeafPropTreeItem }): void => {
  emits('callback', { propTree, ...params });
};

</script>

<style scoped>
.treeContainerRef {
  background: #00212b;
  width: 100%;
  overflow: auto;
  overflow-anchor: none;
}
</style>
