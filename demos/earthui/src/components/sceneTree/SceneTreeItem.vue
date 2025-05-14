<template>
  <!-- ES3DTileset树节点 -->
  <TileTreeItem v-if="(sceneTreeItem.isExport === false) && (sceneTreeItem.extras)" :sceneTreeItem="sceneTreeItem"
    :tree="tree">
  </TileTreeItem>
  <!-- 其他树节点 -->
  <div v-else class="item_Style" :style="getItemStyle()" @mouseenter="hover = true" @mouseleave="hover = false"
    :draggable="!nameEditingRef" @dragstart.stop="ondragstart($event)" @drop.stop="ondrop($event)"
    @dragover.stop="ondragover($event)" @dragleave.stop="ondragleave($event)" @click.stop="select($event)"
    @contextmenu.stop.prevent="onContexMenu()" @dblclick="flyTo()">
    <div :style="itemTopStyle()" class="top_style">
      <Collapse :collapseProps="collapsedSymbol()" @collapseFunc="collapseFunc()"></Collapse>
      <!-- 多选框 -->
      <div class="check_box" @click.stop="changeCheckedStatus()" v-show="props.showCheckBox">
        <es-icon :name="checkStr[sceneTreeItem.uiTreeObject.checkedStatus]"
          :color="checkColor[sceneTreeItem.uiTreeObject.checkedStatus]" :size="18" />
        <!-- {{ checkStr[sceneTreeItem.uiTreeObject.checkedStatus] }} -->
      </div>
      <!-- 对象图标 -->
      <es-icon :name="sceneTreeItem.type === `Folder` ? 'wenjian_weixuanzhong' : imgStyle()"
        :color="sceneTreeItem.type === `Folder` ? getFloderIconStyle() : getIconStyle()" :size="16" />
      <!-- 节点名称 -->
      <div class="treeItem-name" :style="sceneTreeItem.type === `Folder` ? getFolderTitleStyle() : getItemTitleStyle()"
        v-show="!nameEditingRef">
        {{ sceneTreeItem.name }}
      </div>
      <div v-if="nameEditingRef" class="file_name" @click.stop>
        <input type="text" v-model="editingName" @blur="setName()" @keydown.esc.native="offSetName()"
          @keydown.enter.native="setName()" v-select>
      </div>
    </div>
    <!-- 眼睛图标 -->
    <span class="eye" title="是否可见" @click.stop="show = !show"><es-icon :name="show ? 'show' : 'unshow'"
        :color="'rgba(151, 153, 154, 1)'" :size="18" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { createVueDisposer, Message, toVR } from "earthsdk-ui";
import { ES3DTileset, ESLocalSkyBox, ESTextLabel, SceneTree, SceneTreeItem } from 'earthsdk3';
import { inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import Collapse from "../commom/Collapse.vue";
import { styleList } from "./scenetreeItemStyle";
import TileTreeItem from "./TileTreeItem.vue";
const dragModeAndBorderWidthMap = {
  none: "0px",
  before: "1px 0 0 0",
  after: "0 0 1px 0",
  inner: "1px",
}
const emits = defineEmits(['contexMenuEvent', 'close'])

const checkStr = {
  unchecked: "unchecked",
  checked: "checked",
  indeterminate: "indeterminate",
}
const checkColor = {
  unchecked: "rgba(230, 230, 230, 1)",
  checked: "#fff",
  indeterminate: "rgba(230, 230, 230, 1)",
}
const props = withDefaults(defineProps<{
  sceneTreeItem: SceneTreeItem;
  isLastSelectedObject: boolean;
  tree: SceneTree;
  showCheckBox: boolean;
}>(), {
  showCheckBox: false,
})
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const { sceneTreeItem, isLastSelectedObject, tree } = props;

const disposer = createVueDisposer(onBeforeUnmount);
const nameEditingRef = toVR<boolean>(disposer, [sceneTreeItem, "nameEditing"])
const show = toVR<boolean>(disposer, [sceneTreeItem, "show"])
const sceneObject = sceneTreeItem.sceneObject
let dispose: any
if (sceneObject) {
  //@ts-ignore
  dispose = sceneObject.showChanged.disposableOn((val) => {
    if (sceneTreeItem) {
      sceneTreeItem.show = val
    }
  })
}

onMounted(() => {
  if (nameEditingRef.value) {
    editingName.value = sceneTreeItem.name
  }
  if (sceneTreeItem.sceneObject instanceof ES3DTileset) {
    if (sceneTreeItem.children && sceneTreeItem.children.length > 0) return;
    let tilesUrl = typeof sceneTreeItem.sceneObject.url === 'string' ? sceneTreeItem.sceneObject.url : sceneTreeItem.sceneObject.url.url;
    const url = tilesUrl.replace(/tileset.json/g, 'scenetree.json')
    fetch(url).then(async (res) => {
      const json = await res.json()
      if (!json) return;
      if (json.scenes && json.scenes.length > 0) {
        tilesetList.value = json.scenes
      } else if (json.children && json.children.length > 0) {
        tilesetList.value = json.children
      } else {
        tilesetList.value = []
      }
    }).catch(err => console.warn(err))

  }
})
onBeforeUnmount(() => {
  if (dispose) {
    dispose()
    dispose = undefined
  }
})


const imgStyle = () => {
  const { sceneObject } = sceneTreeItem
  if (!sceneObject) return

  for (let i = 0; i < styleList.length; i++) {
    if (sceneObject instanceof styleList[i].type) {
      return styleList[i].name
    }
  }
}

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


    if (sceneTreeItem.sceneObject instanceof ESTextLabel) {
      const sceneObject = sceneTreeItem.sceneObject as ESTextLabel
      sceneObject.text = editingName.value
    }
  }
  nameEditingRef.value = false
}

const offSetName = () => {
  if (nameEditingRef.value) {
    editingName.value = sceneTreeItem.name
  }
}

const getItemStyle = () => ({
  background: sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgba(27, 27, 27, 0.5)" : sceneTreeItem.uiTreeObject.selected ? "rgba(27, 27, 27, 0.5)" : hover.value ? "rgba(27, 27, 27, 0.5)" : '',
  borderWidth: dragModeAndBorderWidthMap[sceneTreeItem.uiTreeObject.moveToPositionMode],
  borderStyle: 'solid',
  borderColor: 'rgba(183, 183, 183, 0.22)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // padding: '0 15px',
})
const getIconStyle = () => {
  const color = sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgba(87, 136, 255, 1)" : sceneTreeItem.uiTreeObject.selected ? "rgba(87, 136, 255, 1)" : hover.value ? "rgba(87, 136, 255, 1)" : 'rgba(230, 230, 230, 1)'
  return color
}
const getFloderIconStyle = () => {
  const color = sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgba(87, 136, 255, 1)" : sceneTreeItem.uiTreeObject.selected ? "rgba(87, 136, 255, 1)" : hover.value ? "rgba(87, 136, 255, 1)" : '#fff'
  return color
}
const getItemTitleStyle = () => ({
  color: sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgba(87, 136, 255, 1)" : sceneTreeItem.uiTreeObject.selected ? "rgba(87, 136, 255, 1)" : hover.value ? "rgba(87, 136, 255, 1)" : 'rgba(230, 230, 230, 1)',
})
const getFolderTitleStyle = () => ({
  color: sceneTreeItem.uiTreeObject.selected && isLastSelectedObject ? "rgba(87, 136, 255, 1)" : sceneTreeItem.uiTreeObject.selected ? "rgba(87, 136, 255, 1)" : hover.value ? "rgba(87, 136, 255, 1)" : '#fff',
})
const itemTopStyle = () => ({
  height: 28 + "px",
  paddingLeft: `${(sceneTreeItem.level - 1) * 6}px`,
});

const collapsedSymbol = () => {
  if (!sceneTreeItem.children || sceneTreeItem.children.length === 0) {
    return "";
  } else if (sceneTreeItem.uiTreeObject.collapsed) {
    return "＞";
  } else {
    return "∨";
  }
};

const collapseFunc = () => sceneTreeItem.uiTreeObject.collapsed = !sceneTreeItem.uiTreeObject.collapsed

const select = (e: Event) => {
  // console.log('点击', sceneTreeItem.sceneObject);
  const uiTreeObj = sceneTreeItem.uiTreeObject
  // @ts-ignore
  if (e.ctrlKey) {
    uiTreeObj.selected = !uiTreeObj.selected
  } else {
    collapseFunc() //开合
    tree.uiTree.clearAllSelectedItems()
    uiTreeObj.selected = true
    if (xbsjEarthUi.propSceneTree && sceneTreeItem && sceneTreeItem.type != 'Folder') {
      xbsjEarthUi.propSceneTree = sceneTreeItem
    } else if (sceneTreeItem.type === 'Folder') {
      emits('close')


    }

  }
}
const ondragstart = (e: DragEvent) => sceneTreeItem.dragDrop.dragStart(e)
const ondrop = (e: DragEvent) => sceneTreeItem.dragDrop.drop(e)
const ondragover = (e: DragEvent) => sceneTreeItem.dragDrop.dragOver(e)
const ondragleave = (e: DragEvent) => sceneTreeItem.dragDrop.dragLeave(e)
const changeCheckedStatus = () => {
  sceneTreeItem.uiTreeObject.check(sceneTreeItem.uiTreeObject.checkedStatus !== "checked")
  // console.log(1111111111111);

}

const flyTo = () => {
  const { sceneObject } = sceneTreeItem
  if (sceneObject instanceof ESLocalSkyBox) {
    sceneObject.flyIn()
  } else if (sceneObject && Reflect.has(sceneObject, 'flyTo')) {
    // @ts-ignore
    sceneObject.flyTo()
  } else {
    Message.warning('暂不支持定位!')
  }
}

const onContexMenu = () => {
  tree.uiTree.clearAllSelectedItems()
  sceneTreeItem.uiTreeObject.selected = true
  emits('contexMenuEvent', sceneTreeItem)
}
interface TileTreeItem {
  type: "element" | "node",
  id: string,
  name: string,
  sphere: [number, number, number, number],
  children?: TileTreeItem[],
}

const tilesetList = ref<TileTreeItem[]>([]);
const createTreeItem = (item: SceneTreeItem, list?: TileTreeItem[]) => {
  if (list === undefined) return
  let treeItems: SceneTreeItem[] = []
  const esid = sceneTreeItem?.sceneObject?.id;
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    const hasChildren = element.children && element.children.length > 0
    //@ts-ignore
    const treeItem = new SceneTreeItem(tree, hasChildren, undefined, { ...element, esid }, false)
    treeItem.name = element.name;
    //@ts-ignore
    treeItem.show = sceneTreeItem?.sceneObject?.show
    treeItem.uiTreeObject.collapsed = true;
    treeItems.push(treeItem);
    if (hasChildren) {
      createTreeItem(treeItem, element.children)
    }
  }
  treeItems.forEach(el => { item.insertNewTreeItem('Inner', el) })
}
watch(tilesetList, (val) => {
  if (sceneTreeItem.type !== 'ES3DTileset') return;
  if (sceneTreeItem.children && sceneTreeItem.children.length > 0) return;
  sceneTreeItem.uiTreeObject.collapsed = true;
  createTreeItem(sceneTreeItem, val)
})
</script>

<style src="../css/SceneTreeItem.css" scoped></style>