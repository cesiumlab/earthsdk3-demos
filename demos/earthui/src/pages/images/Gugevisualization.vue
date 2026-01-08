<script setup lang="ts">
import { ESGeHistoryImagery } from 'earthsdk3-cesium'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { SceneTree } from 'earthsdk3'
import RightList from '../../components/RightList.vue'
const sceneTree = inject('sceneTree') as SceneTree
const timesList = ref<string[] | undefined>([])
let dispose: any
let sceneObject: any
const a = ref(0)
const chlastSelectedItem = () => {
  if (dispose) {
    dispose()
    dispose = undefined
    sceneObject = undefined
  }
  const lastSelectedItem = sceneTree.lastSelectedItem
  if (!lastSelectedItem) return
  if (lastSelectedItem?.type === 'ESGeHistoryImagery') {
    sceneObject = sceneTree.lastSelectedItem.sceneObject as unknown as ESGeHistoryImagery
    setTimeout(() => {
      currentTime.value = sceneObject.currentDate
    }, 100)
    dispose = sceneObject.datesEvent.don((val: any) => {
      timesList.value = val
    })
  }
}
onMounted(() => {
  chlastSelectedItem()
  const selectedItems = sceneTree.selectedItems
  const dispose = selectedItems.changedEvent.don(chlastSelectedItem)
  onBeforeUnmount(dispose)
})
const changeLayerListShow = (item: any) => {
  if (sceneObject) {
    currentTime.value = item
    sceneObject.currentDate = item
  }
  ulIsShow.value = false
}
const currentTime = ref()
const ulIsShow = ref(false)
</script>
<template>
  <RightList :title="'可视化--谷歌影像'">
    <div class="roam_moveOnLineMode" style="margin-left: 15px">
      <div>
        <label for="">时间:</label
        ><input type="text" placeholder="请选择" v-model="currentTime" readonly />
        <span class="roam_listSpan" @click="ulIsShow = !ulIsShow"
          ><es-icon :name="'liebiao'" :color="'rgba(216, 216, 216, 1)'" :size="15"
        /></span>
        <ul v-if="ulIsShow" class="analysis_ul" :key="a">
          <li v-for="item in timesList" @click="changeLayerListShow(item)" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </RightList>
</template>
