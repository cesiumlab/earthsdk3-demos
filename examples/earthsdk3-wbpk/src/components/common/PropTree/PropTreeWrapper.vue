<template>
  <div class="prop-tree-wrapper">
    <div class="prop-tree-comp">
      <PropTreeCom :propTree="propTree" :showCheckBox="showCheckBox" @callback="callback"></PropTreeCom>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { PropertyCompCallbackFuncParamsType } from "./Properties/base";
import PropTreeCom from "./PropTree.vue";
import { PropTree, GroupPropTreeItem, LeafPropTreeItem, } from "earthsdk3";

const props = withDefaults(defineProps<{
  propTree: PropTree;
  nameTitle?: string;
}>(), {
  nameTitle: '属性管理器',
});
const emits = defineEmits<{
  (e: 'callback', params: PropertyCompCallbackFuncParamsType & { treeItem: GroupPropTreeItem | LeafPropTreeItem, propTree: PropTree }): void;
}>();

const { propTree } = props;

const callback = (params: PropertyCompCallbackFuncParamsType & { treeItem: GroupPropTreeItem | LeafPropTreeItem, propTree: PropTree }): void => {
  emits('callback', params);
};

const showCheckBox = ref(false);

</script>

<style scoped>
.prop-tree-wrapper {
  min-width: 260px;
  background: #00212b;
  height: 60%;
}

.prop-tree-comp {
  width: 100%;
  height: calc(100% - 30px);
}

.scence_tree_name {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.sign_title {
  width: 100%;
  height: 24px;
  border: 1px solid #004052;
  background: #1a343c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign_title:hover {
  border: 1px solid #0383aa;
}

.sign_title div {
  font-size: 12px;
  color: #fff;
}

.sign {
  width: 18px;
  font-size: 18px !important;
}

.sign_set {
  width: 14px;
  height: 14px;
}

.sign_set_box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.sign_set_box img {
  cursor: pointer;
  margin: 0 5px;
}
</style>
