<template>
  <div ref="treeContainerRef" class="treeContainerRef innerbox">
    <div :style="allStyleRef">
      <div :style="topStyleRef">
      </div>
      <div :key="updateKeyRef">
        <slot v-if="!!tree" v-for="treeItem in tree.uiTree.redrawInfo.middleTreeItems" :key="treeItem.id"
          :treeItem="treeItem">
        </slot>
      </div>
      <div :style="bottomStyleRef">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createVueDisposer } from "./tools";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { setExtProp, getExtProp, TreeItem, Tree, createAnimateFrameWithStartValues, RedrawInfo } from "xbsj-base";

const props = withDefaults(defineProps<{
  tree: Tree<TreeItem>,
}>(), {
});

const { tree } = props;

const vueDisposer = createVueDisposer(onBeforeUnmount)

const topStyleRef = ref({});
const allStyleRef = ref({});
const bottomStyleRef = ref({});
const updateKeyRef = ref(0);

function checkTreeItems(redrawInfo: RedrawInfo<TreeItem>) {
  if (redrawInfo.middleTreeItems.some(e => e.isDestroyed())) {
    console.error(`redrawInfo.middleTreeItems.some(e => e.isDestroyed())`);
    debugger;
  }
}

const update = () => {
  checkTreeItems(tree.uiTree.redrawInfo);
  topStyleRef.value = { height: (tree.uiTree.redrawInfo.topUnvisibleItemNum ?? 0) * (tree.itemDivHeight ?? 0) + 'px' }
  bottomStyleRef.value = { height: (tree.uiTree.redrawInfo.bottomUnvisibleItemNum ?? 0) * (tree.itemDivHeight ?? 0) + 'px' }
  const { topUnvisibleItemNum: t, bottomUnvisibleItemNum: b, middleTreeItems: { length: m } } = tree.uiTree.redrawInfo;
  allStyleRef.value = { height: (t + m + b) * tree.itemDivHeight + 'px' }
  updateKeyRef.value++;
}
update()
vueDisposer.dispose(tree.uiTree.redrawEvent.dwon(update))

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
      console.error('tree.uiTree已在其他地方使用，不能再重复使用，除非其他地方先销毁掉！ originDiv', originDiv);
    } else {
      setExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer', treeContainer);
    }
  }
  let warned = false;
  const animateFrame = createAnimateFrameWithStartValues(() => {
    const registereDiv = getExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer')
    if (registereDiv !== treeContainer) {
      if (!warned) {
        warned = true;
        console.error(`如果registereDiv !== treeContainer，那么Tree.vue组件将不再工作！`);
      }
      return;
    }
    if (treeContainer && tree.uiTree) {
      tree.uiTree.containerScrollTop = treeContainer.scrollTop;
      tree.uiTree.containerClientHeight = treeContainer.clientHeight;
    }
  });
  animateFrame.start();
  onBeforeUnmount(() => {
    animateFrame.destroy()
    setExtProp<HTMLDivElement | null>(tree.uiTree, '_treeContainer', null);
  });
});

</script>

<style scoped>
.treeContainerRef {
  background: #00212b;
  min-height: 90px;
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-anchor: none;
}

.innerbox {
  overflow-y: auto;
}

.innerbox::-webkit-scrollbar {
  width: 4px;
}

.innerbox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(88, 88, 88, 1);
}

.innerbox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);

}
</style>
