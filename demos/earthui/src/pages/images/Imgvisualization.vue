<script setup lang="ts">
import { ESLabelSlider, vue3Xe2Bind } from 'earthsdk-ui'
// TODO:添加ESMVTLayer,后期可能要删掉
import { Destroyable, ESImageryLayer, ESMediaLayer, ESMVTLayer, ObjResettingWithEvent, SceneTree } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import RightList from '../../components/RightList.vue'
const sceneTree = inject('sceneTree') as SceneTree
const isshow = ref(false)
const showName = ref('请选中影像图层')
const selectedItems = sceneTree.selectedItems;

const typeNames = ['ESImageryLayer', 'ESMVTLayer', 'ESMediaLayer'];
//控制显影
const chlastSelectedItem = () => {
  isshow.value = false
  showName.value = '请选中影像图层'
  const lastSelectedItem = sceneTree.lastSelectedItem
  if (!lastSelectedItem) return
  if (typeNames.includes(lastSelectedItem?.type)) {
    setTimeout(() => {
      showName.value = lastSelectedItem.name
    }, 100)
    isshow.value = true
  } else {
    showName.value = '请选中影像图层'
    isshow.value = false
  }
}
//透明度
const czmAlpha = ref(1)
//对比度
const czmContrast = ref(1)
//亮度
const czmBrightness = ref(1)
//色相
const czmHue = ref(0)
//饱和度
const czmSaturation = ref(1)
//czmGamma
const czmGamma = ref(1)


class ImageryController extends Destroyable {
  constructor(private _esImageryLayer: ESImageryLayer | ESMVTLayer | ESMediaLayer) {
    super()
    this.d(vue3Xe2Bind(czmAlpha, [this._esImageryLayer, 'czmAlpha'], ESImageryLayer.defaults.czmAlpha))
    this.d(vue3Xe2Bind(czmContrast, [this._esImageryLayer, 'czmContrast'], ESImageryLayer.defaults.czmContrast))
    this.d(vue3Xe2Bind(czmBrightness, [this._esImageryLayer, 'czmBrightness'], ESImageryLayer.defaults.czmBrightness))
    this.d(vue3Xe2Bind(czmHue, [this._esImageryLayer, 'czmHue'], ESImageryLayer.defaults.czmHue))
    this.d(vue3Xe2Bind(czmSaturation, [this._esImageryLayer, 'czmSaturation'], ESImageryLayer.defaults.czmSaturation))
    this.d(vue3Xe2Bind(czmGamma, [this._esImageryLayer, 'czmGamma'], ESImageryLayer.defaults.czmGamma))
    // this.d(
    //   vue3Xe2Bind(
    //     czmSplitDirection,
    //     [this._esImageryLayer, 'czmSplitDirection'],
    //     ESImageryLayer.defaults.czmSplitDirection
    //   )
    // )
  }
}
onMounted(() => {
  const objResetting = new ObjResettingWithEvent(sceneTree.selectedItems.changedEvent, () => {
    const { lastSelectedItem } = sceneTree
    if (!lastSelectedItem) return undefined
    const { sceneObject } = lastSelectedItem
    if (!sceneObject) return undefined
    if (!typeNames.includes(sceneObject.typeName)) return undefined
    return new ImageryController(sceneObject as ESImageryLayer | ESMVTLayer | ESMediaLayer)
  })
  chlastSelectedItem();
  const dispose = selectedItems.changedEvent.don(chlastSelectedItem);
  onBeforeUnmount(() => { objResetting.destroy(); dispose() })
})
</script>

<template>
  <RightList :title="`可视化--${showName}`">
    <div class="images_relative_box_item">
      <ESLabelSlider class="content_item" v-model="czmAlpha" :min="0" :max="1" :step="0.01" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">透明度</span>
        </template>
        <!-- <template #suffix>
          <span class="content_item_fix">%</span>
        </template> -->
      </ESLabelSlider>
    </div>
    <div class="images_relative_box_item">
      <ESLabelSlider class="content_item" v-model="czmContrast" :min="0" :max="999" :step="0.01" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">对比度</span>
        </template>
      </ESLabelSlider>
    </div>

    <div class="images_relative_box_item">
      <ESLabelSlider class="content_item" v-model="czmBrightness" :min="0" :max="999" :step="0.01" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">亮度</span>
        </template>
      </ESLabelSlider>
    </div>
    <div class="images_relative_box_item">
      <ESLabelSlider class="content_item" v-model="czmHue" :min="0" :max="360" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">色相</span>
        </template>
      </ESLabelSlider>

    </div>
    <div class="images_relative_box_item">

      <ESLabelSlider class="content_item" v-model="czmSaturation" :min="0" :max="999" :step="0.01" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">饱和度</span>
        </template>
      </ESLabelSlider>
    </div>
    <div class="images_relative_box_item">
      <ESLabelSlider class="content_item" v-model="czmGamma" :min="0" :max="999" :step="0.01" :disabled="!isshow">
        <template #prefix>
          <span class="content_item_fix left_item">伽马值</span>
        </template>
      </ESLabelSlider>
    </div>
  </RightList>
</template>
<style scoped>
.images_relative_box_item {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  gap: 5px;
}

.content_item_fix {
  color: var(--el-text-color-regular);
  font-size: 12px;
}

.left_item {
  width: 50px;
  text-align: center;
}
</style>
