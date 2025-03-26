<template>
  <div :style="itemTopStyle()" class="item_top_style" @mouseenter="hover = true" @mouseleave="hover = false">
    <Collapse :collapseProps="collapsedSymbol()" @collapseFunc="collapseFunc()"></Collapse>
    <div style="width: 18px; font-size: 18px; text-align: center;color: #ccc;cursor: pointer;"
      @click.stop="changeCheck()" v-show="props.showCheckBox">
      {{ checkString() }}
    </div>
    <div class="prop_item" style="margin-left: 6px; font-size: 12px" :title="comTitle">
      <div class="prop_item-title" @dblclick="copyPropName" :title="enName" @click.stop="select($event)">
        {{ name }}
      </div>
      <div class="prop_item_edit">
        <component :is="comp" :property="property" @callback="callback"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LeafPropTreeItem, GroupPropTreeItem, PropTree, ReactVarProperty } from "earthsdk3";
import { onMounted, ref } from "vue";
import Collapse from "../CollapseProp.vue";
import { propComps } from './Properties';
import { copyClipboard } from '../../utility/copyClipboard';
import { PropertyCompCallbackFuncParamsType } from "./Properties/base";

const checkStr: any = {
  unchecked: "\u2610",
  checked: "\u2611",
  indeterminate: "\u2612",
};

const props = withDefaults(defineProps<{
  treeItem: LeafPropTreeItem | GroupPropTreeItem;
  showCheckBox: boolean;
  tree: PropTree;
}>(), {
  showCheckBox: false,
});
const emtis = defineEmits<{
  (e: 'callback', params: PropertyCompCallbackFuncParamsType & { treeItem: LeafPropTreeItem | GroupPropTreeItem }): void;
}>();

const { treeItem, tree } = props;

const hover = ref(false);
const itemTopStyle = () => {
  const paddingLeft = (!treeItem.children) ? '0px' : `${(treeItem.level - 1) * 12}px`
  return {
    height: tree.itemDivHeight + "px",
    background: hover.value ? "#003847" : treeItem.uiTreeObject.selected ? "rgb(6 81 100)" : (!treeItem.children) ? "#00212b" : "rgb(5 45 57)",
    paddingLeft: paddingLeft,
    width: `calc(100% - ${paddingLeft}) `,
  };
};

const collapsedSymbol = () => {
  return `${!treeItem.children
    ? ""
    : treeItem.uiTreeObject.collapsed
      ? "＞"
      : "∨"
    }`;
};

const { property } = treeItem
const { description, name, type } = property

const enName = ref<string>('')
const comTitle = ref<string>('')
const comp = propComps[type]
const checkString = () => checkStr[treeItem.uiTreeObject.checkedStatus]

onMounted(() => {
  if ((property instanceof ReactVarProperty) && (Array.isArray(property.reactVar))) {
    enName.value = property.reactVar[1].toString()
    const title = name + '(' + enName.value + ')  ' + description
    comTitle.value = title
  } else {
    comTitle.value = name + '  ' + description
  }
})

const callback = (params: PropertyCompCallbackFuncParamsType): void => {
  emtis('callback', {
    treeItem,
    ...params,
  });
};

const copyPropName = () => {
  if ((property instanceof ReactVarProperty) && (Array.isArray(property.reactVar))) {
    const propName = property.reactVar[1].toString()
    copyClipboard(propName)
  }
}

const select = (e: Event) => {
  if (!property) {
    return;
  }
  collapseFunc(); //开合 属性界面不需要选中效果
  //@ts-ignore
  if (e.ctrlKey) {
    treeItem.uiTreeObject.selected = !treeItem.uiTreeObject.selected;
  } else {
    tree.uiTree.clearAllSelectedItems();
    treeItem.uiTreeObject.selected = true;
  }
}

const changeCheck = () => {
  treeItem.uiTreeObject.check(
    treeItem.uiTreeObject.checkedStatus !== "checked"
  );
}

const collapseFunc = () => {
  treeItem.uiTreeObject.collapsed = !treeItem.uiTreeObject.collapsed;
}
</script>

<style scoped>
.item_top_style {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #ccc;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  flex-wrap: nowrap;
  transition: background .3s;
}

.prop_item {
  width: calc(100% - 36px);
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

}

.prop_item_edit {
  width: calc(100% - 90px);
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.prop_item-title {
  width: 100px;
  margin-right: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
}
</style>
