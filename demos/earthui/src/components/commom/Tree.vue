<template>
  <div ref="treeContainerRef" class="treeContainerRef">
    <div :style="allStyleRef">
      <div :style="topStyleRef"></div>
      <div :key="updateKeyRef">
        <slot
          v-if="!!tree"
          v-for="treeItem in tree.uiTree.redrawInfo.middleTreeItems"
          :key="treeItem.id"
          :treeItem="treeItem"
        >
        </slot>
      </div>
      <div :style="bottomStyleRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeItem } from 'earthsdk3'
import { createVueDisposer } from 'earthsdk-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Tree, createAnimateFrameWithStartValues } from 'earthsdk3'
import { setExtProp, getExtProp } from 'earthsdk3'

const props = withDefaults(
  defineProps<{
    tree: Tree<TreeItem>
  }>(),
  {}
)

const { tree } = props

const vueDisposer = createVueDisposer(onBeforeUnmount)

const topStyleRef = ref({})
const allStyleRef = ref({})
const bottomStyleRef = ref({})
const updateKeyRef = ref(0)
const update = () => {
  topStyleRef.value = {
    height: (tree.uiTree.redrawInfo.topUnvisibleItemNum ?? 0) * (tree.itemDivHeight ?? 0) + 'px'
  }
  bottomStyleRef.value = {
    height: (tree.uiTree.redrawInfo.bottomUnvisibleItemNum ?? 0) * (tree.itemDivHeight ?? 0) + 'px'
  }
  const {
    topUnvisibleItemNum: t,
    bottomUnvisibleItemNum: b,
    middleTreeItems: { length: m }
  } = tree.uiTree.redrawInfo
  allStyleRef.value = { height: (t + m + b) * tree.itemDivHeight + 'px' }
  updateKeyRef.value++
}
update()
vueDisposer.d(tree.uiTree.redrawEvent.dwon(update))

const treeContainerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const treeContainer = treeContainerRef.value
  if (!treeContainer) {
    console.error('treeContainerRef is null')
    return
  }

  {
    const originDiv = getExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer')
    if (originDiv) {
      console.error(
        'tree.uiTree已在其他地方使用，不能再重复使用，除非其他地方先销毁掉！ originDiv',
        originDiv
      )
    } else {
      setExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer', treeContainer)
    }
  }
  let warned = false
  const animateFrame = createAnimateFrameWithStartValues(() => {
    const registereDiv = getExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer')
    if (registereDiv !== treeContainer) {
      if (!warned) {
        warned = true
        console.error(`如果registereDiv !== treeContainer，那么Tree.vue组件将不再工作！`)
      }
      return
    }
    if (treeContainer && tree.uiTree) {
      tree.uiTree.containerScrollTop = treeContainer.scrollTop
      tree.uiTree.containerClientHeight = treeContainer.clientHeight
    }
  })
  animateFrame.start()
  onBeforeUnmount(() => {
    animateFrame.destroy()
    setExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer', null)
  })
})
</script>

<style scoped>
.treeContainerRef {
  /* background: rgba(71, 71, 71, 0.8); */
  /* min-height: 90px; */
  max-height: 800px;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
}

.treeContainerRef::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(41, 42, 46, 1);
  border-radius: 2px;
}

.treeContainerRef::-webkit-scrollbar-thumb {
  background-color: rgba(183, 183, 183, 1);
  border-radius: 2px;
}
</style>
