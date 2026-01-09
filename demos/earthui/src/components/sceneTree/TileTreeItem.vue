<script setup lang="ts">
import { ES3DTileset, ESSceneObject, SceneTree, SceneTreeItem } from 'earthsdk3'
import { ref, StyleValue } from 'vue'
import Collapse from '../commom/Collapse.vue'

const props = withDefaults(
  defineProps<{
    sceneTreeItem: any
    tree: SceneTree
  }>(),
  {}
)

const { sceneTreeItem, tree } = props

const getItemStyle = () =>
  ({
    height: 34 + 'px'
  }) as StyleValue

const itemTopStyle = () => ({
  height: 34 + 'px',
  paddingLeft: `${(sceneTreeItem.level - 1) * 6}px`
})

const getCollapseClass = () => {
  try {
    if (
      (!sceneTreeItem.children ||
        (sceneTreeItem.children && sceneTreeItem.children.length === 0)) &&
      sceneTreeItem.type !== 'ES3DTileset'
    )
      return 'collapse-box'
  } catch (error) {
    console.error(`getCollapseClass error: ${error}`, error)
  }
  if (sceneTreeItem.uiTreeObject.collapsed) {
    return 'collapse-right'
  } else {
    return 'collapse-bottom'
  }
}

const collapseFunc = () => {
  const collapsed = sceneTreeItem.uiTreeObject.collapsed ?? false
  sceneTreeItem.uiTreeObject.collapsed = !collapsed
}

const flyTo = () => {
  //@ts-ignore
  const { id, esid, sphere } = sceneTreeItem.extras
  const obj = ESSceneObject.getSceneObjById(esid) as ES3DTileset
  obj.highlightFeatureAndFlyTo(id, sphere, 'rgba(255,0,0,1)', 1)
  // obj.highlightFeature(id, 'rgba(255, 0, 0, 1)');
  // obj.tileFlyTo(sphere);
}

const getChildrenIds = (children: any, showRef: boolean) => {
  let result: any = []
  const aaa = (item: any, result: any, showRef: boolean) => {
    const { children, id, type } = item
    if (type === 'element') {
      result.push({ value: id, visable: showRef })
    }
    if (children && children.length > 0) {
      children.forEach((item: any) => aaa(item, result, showRef))
    }
  }
  children.forEach((item: any) => aaa(item, result, showRef))
  return result
}
const changeShow = () => {
  const showRef = sceneTreeItem.show
  sceneTreeItem.show = !showRef
  //@ts-ignore
  const { id, esid, children } = sceneTreeItem.extras
  const obj = ESSceneObject.getSceneObjById(esid) as ES3DTileset
  if (children && children.length > 0) {
    const ids = getChildrenIds(children, !showRef)
    setTimeout(() => {
      obj.setFeatureVisable('id', ids)
    }, 0)
  } else {
    obj.setFeatureVisable('id', [{ value: id, visable: !showRef }])
  }
}
const collapsedSymbol = () => {
  if (
    (!sceneTreeItem.children || (sceneTreeItem.children && sceneTreeItem.children.length === 0)) &&
    sceneTreeItem.type !== 'ES3DTileset'
  ) {
    return ''
  } else if (sceneTreeItem.uiTreeObject.collapsed) {
    return '＞'
  } else {
    return '∨'
  }
}
</script>

<template>
  <div :class="['item_style', 'tile_item']" :style="getItemStyle()" @dblclick="flyTo()">
    <!-- 眼睛图标 -->
    <!-- <span class="eye" :class="sceneTreeItem.show ? 'eye-show' : 'eye-hide'" title="是否可见"
            @click.stop="changeShow"></span> -->
    <div :style="itemTopStyle()" class="top_style">
      <!-- 展开图标 -->
      <Collapse :collapseProps="collapsedSymbol()" @collapseFunc="collapseFunc()"></Collapse>

      <!-- <span class="collapse" :class="getCollapseClass()" @click.stop="collapseFunc()"></span> -->
      <!-- 文件夹类型图标 -->
      <span
        class="scene-tree-item-type"
        :class="sceneTreeItem.extras.type === `node` ? 'node-type' : 'element-type'"
      ></span>
      <div class="treeItem-name">
        {{ sceneTreeItem.name }}
      </div>
    </div>
    <span class="eye" title="是否可见" @click.stop="changeShow"
      ><es-icon
        :name="sceneTreeItem.show ? 'show' : 'unshow'"
        :color="'rgba(151, 153, 154, 1)'"
        :size="18"
    /></span>
  </div>
</template>

<style scoped src="../css/SceneTreeItem.css"></style>
