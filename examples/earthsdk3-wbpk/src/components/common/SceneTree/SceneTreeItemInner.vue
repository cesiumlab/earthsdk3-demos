<template>
  <!-- 其他树节点 -->
  <div class="item_Style" :style="getItemStyle()" @mouseenter="hover = true" @mouseleave="hover = false"
    :draggable="!nameEditingRef" @dragstart.stop="ondragstart($event)" @drop.stop="ondrop($event)"
    @dragover.stop="ondragover($event)" @dragleave.stop="ondragleave($event)" @click.stop="select($event)"
    @contextmenu.stop.prevent="onContexMenu()" @dblclick="flyTo()">
    <!-- 眼睛图标 -->
    <span class="eye" :class="sceneTreeItem.show ? 'eye-show' : 'eye-hide'" title="是否可见"
      @click.stop="sceneTreeItem.show = !sceneTreeItem.show"></span>
    <div :style="itemTopStyle()" class="top_style">
      <!-- 展开图标 -->
      <span class="collapse" :class="getCollapseClass()" @click.stop="collapseFunc()"></span>
      <!-- 复选框图标 -->
      <div class="check_box" @click.stop="changeCheckedStatus()" v-show="props.showCheckBox">
        {{ checkStr[sceneTreeItem.uiTreeObject.checkedStatus] }}
      </div>
      <!-- 文件夹类型图标 -->
      <span class="scene-tree-item-type" :class="sceneTreeItem.type === `Folder` ? 'folder-type' : 'file-type'"></span>
      <div class="treeItem-name" v-show="!nameEditingRef">
        {{ sceneTreeItem.name }}
      </div>
      <!-- 节点名称 -->
      <div v-if="nameEditingRef" class="file_name" @click.stop>
        <input type="text" v-model="editingName" @blur="setName()" @keydown.esc.native="offSetName()"
          @keydown.enter.native="setName()" v-select>
      </div>
    </div>
    <span class="cancel" title="删除对象" @click.stop="deleteItem()"></span>
  </div>
</template>

<script setup lang="ts">
import { StyleValue, nextTick, onBeforeUnmount, onMounted, ref, shallowReactive, watch } from "vue";
import { SceneTree, SceneTreeItem } from "earthsdk3";
import { createVueDisposer, toVR } from '../../tools';
import Message from '../../utility/Message';

const dragModeAndBorderWidthMap = {
  none: "0px",
  before: "1px 0 0 0",
  after: "0 0 1px 0",
  inner: "1px",
}
const checkStr = {
  unchecked: "\u2610",
  checked: "\u2611",
  indeterminate: "\u2612",
}

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

const { sceneTreeItem, isLastSelectedObject, tree } = props;
const disposer = createVueDisposer(onBeforeUnmount);
const nameEditingRef = toVR<boolean>(disposer, [sceneTreeItem, "nameEditing"])

const deleteItem = () => {
  sceneTreeItem.detachFromParent();
}

const getCollapseClass = () => {
  try {
    if ((!sceneTreeItem.children || (sceneTreeItem.children && sceneTreeItem.children.length === 0))) return 'collapse-box'
  } catch (error) {
    console.error(`getCollapseClass error: ${error}`, error);
  }

  if (sceneTreeItem.uiTreeObject.collapsed === true) {
    return 'collapse-right'
  }
  if (sceneTreeItem.uiTreeObject.collapsed === false || sceneTreeItem.uiTreeObject.collapsed === undefined) {
    return 'collapse-bottom'
  }
  return 'collapse-box'
}

onMounted(() => {
  if (nameEditingRef.value) {
    editingName.value = sceneTreeItem.name
  }
})

watch(nameEditingRef, (val) => {
  if (val) {
    editingName.value = sceneTreeItem.name
  }
})

const hover = ref(false)
const editingName = ref('')

const vSelect = {
  beforeMount: (el: HTMLInputElement) => {
    nextTick(() => {
      el.select()
    });
  }
}

const setName = () => {
  if (!nameEditingRef.value) {
    return
  }
  if (editingName) {
    sceneTreeItem.name = editingName.value
  }
  nameEditingRef.value = false
}

const offSetName = () => {
  if (nameEditingRef.value) {
    editingName.value = sceneTreeItem.name
  }
}

const getItemStyle = () => ({
  background: sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgb(34 92 107)" : sceneTreeItem.uiTreeObject.selected ? "rgb(6 81 100)" : hover.value ? "#003847" : '',
  borderWidth: dragModeAndBorderWidthMap[sceneTreeItem.uiTreeObject.moveToPositionMode],
  borderStyle: 'solid',
  borderColor: 'white',
  boxSizing: 'border-box',
  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
  height: tree.itemDivHeight + "px",
}) as StyleValue

const itemTopStyle = () => ({
  height: '100%',
  paddingLeft: `${(sceneTreeItem.level - 1) * 6}px`,
});

const collapseFunc = () => {
  const collapsed = sceneTreeItem.uiTreeObject.collapsed ?? false
  sceneTreeItem.uiTreeObject.collapsed = !collapsed
}

const select = (e: Event) => {
  const uiTreeObj = sceneTreeItem.uiTreeObject
  // @ts-ignore
  if (e.ctrlKey) {
    uiTreeObj.selected = !uiTreeObj.selected
  } else {
    collapseFunc() //开合
    tree.uiTree.clearAllSelectedItems()
    uiTreeObj.selected = true
  }
}

const ondragstart = (e: DragEvent) => sceneTreeItem.dragDrop.dragStart(e)
const ondrop = (e: DragEvent) => sceneTreeItem.dragDrop.drop(e)
const ondragover = (e: DragEvent) => sceneTreeItem.dragDrop.dragOver(e)
const ondragleave = (e: DragEvent) => sceneTreeItem.dragDrop.dragLeave(e)
const changeCheckedStatus = () => sceneTreeItem.uiTreeObject.check(sceneTreeItem.uiTreeObject.checkedStatus !== "checked")

const flyTo = () => {
  const { sceneObject } = sceneTreeItem
  if (sceneObject && Reflect.has(sceneObject, 'flyTo')) {
    // @ts-ignore
    sceneObject.flyTo()
  } else {
    Message.warning('暂不支持定位!')
  }
}

const onContexMenu = () => {
  emits('contexMenuEvent', sceneTreeItem)
}

</script>

<style src="../../css/SceneTreeItem.css" scoped></style>
