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

import TreeComp from "../commom/Tree.vue";
import {  LeafPropTreeItem, GroupPropTreeItem, PropTree } from "earthsdk3";
import { TreeItem, Tree } from "xbsj-base";
import PropTreeItemCom from "./PropTreeItem.vue";
import { PropertyCompCallbackFuncParamsType } from "../eSPropPanel/propertiesMenu/commons";

// document.oncontextmenu = () => {
//   //阻止默认右键事件
//   return false;
// };

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
  width: 100%;
  overflow: auto;
  overflow-anchor: none;
}

.treeContainerRef ::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.treeContainerRef ::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}
</style>
