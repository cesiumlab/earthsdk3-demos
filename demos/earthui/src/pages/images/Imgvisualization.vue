<script setup lang="ts">
import { vue3Xe2Bind } from 'earthsdk-ui'
// TODO:添加ESMVTLayer,后期可能要删掉
import { ESImageryLayer, ESMediaLayer, ESMVTLayer, SceneTree } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Destroyable, ObjResettingWithEvent } from 'earthsdk3'
import RightList from '../../components/RightList.vue'
import SliderTime from '../../components/SliderTime.vue'
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
const czmAlphaSlider = ref(100)
const czmAlphaChange = (val: number) => {
  czmAlpha.value = val / 100
}
//对比度
const czmContrast = ref(1)
const czmContrastSlider = ref(10)
const czmContrastChange = (val: number) => {
  czmContrast.value = val / 10
}
//亮度
const czmBrightness = ref(1)
const czmBrightnessSlider = ref(10)
const czmBrightnessChange = (val: number) => {
  czmBrightness.value = val / 10
}
//色相
const czmHue = ref(0)
const czmHueSlider = ref(0)
const czmHueChange = (val: number) => {
  czmHue.value = val / 10
}
//饱和度
const czmSaturation = ref(1)
const czmSaturationSlider = ref(10)
const czmSaturationChange = (val: number) => {
  czmSaturation.value = val / 10
}
//czmGamma
const czmGamma = ref(1)
const czmGammaSlider = ref(10)
const czmGammaChange = (val: number) => {
  czmGamma.value = val / 10
}
//视口
const czmSplitDirection = ref('NONE')
const beDefault = (type: string) => {
  //透明度
  if (type == 'czmAlpha') {
    czmAlpha.value = ESImageryLayer.defaults.czmAlpha
  }
  //对比度
  if (type == 'czmContrast') {
    czmContrast.value = ESImageryLayer.defaults.czmContrast
  }
  //亮度
  if (type == 'czmBrightness') {
    czmBrightness.value = ESImageryLayer.defaults.czmBrightness
  }
  //色相
  if (type == 'czmHue') {
    czmHue.value = ESImageryLayer.defaults.czmHue
  }
  //饱和度
  if (type == 'czmSaturation') {
    czmSaturation.value = ESImageryLayer.defaults.czmSaturation
  }
  //czmGamma
  if (type == 'czmGamma') {
    czmGamma.value = ESImageryLayer.defaults.czmGamma
  }
}
watch(czmAlpha, (val) => {
  czmAlphaSlider.value = val * 100
})
watch(czmContrast, (val) => {
  czmContrastSlider.value = val * 10
})
watch(czmBrightness, (val) => {
  czmBrightnessSlider.value = val * 10
})
watch(czmHue, (val) => {
  czmHueSlider.value = val * 10
})
watch(czmSaturation, (val) => {
  czmSaturationSlider.value = val * 10
})
watch(czmGamma, (val) => {
  czmGammaSlider.value = val * 10
})
class ImageryController extends Destroyable {
  constructor(private _esImageryLayer: ESImageryLayer | ESMVTLayer | ESMediaLayer) {
    super()
    this.d(
      vue3Xe2Bind(czmAlpha, [this._esImageryLayer, 'czmAlpha'], ESImageryLayer.defaults.czmAlpha)
    )
    this.d(
      vue3Xe2Bind(
        czmContrast,
        [this._esImageryLayer, 'czmContrast'],
        ESImageryLayer.defaults.czmContrast
      )
    )
    this.d(
      vue3Xe2Bind(
        czmBrightness,
        [this._esImageryLayer, 'czmBrightness'],
        ESImageryLayer.defaults.czmBrightness
      )
    )
    this.d(vue3Xe2Bind(czmHue, [this._esImageryLayer, 'czmHue'], ESImageryLayer.defaults.czmHue))
    this.d(
      vue3Xe2Bind(
        czmSaturation,
        [this._esImageryLayer, 'czmSaturation'],
        ESImageryLayer.defaults.czmSaturation
      )
    )
    this.d(
      vue3Xe2Bind(czmGamma, [this._esImageryLayer, 'czmGamma'], ESImageryLayer.defaults.czmGamma)
    )
    this.d(
      vue3Xe2Bind(
        czmSplitDirection,
        [this._esImageryLayer, 'czmSplitDirection'],
        ESImageryLayer.defaults.czmSplitDirection
      )
    )
  }
}
onMounted(() => {
  const objResetting = new ObjResettingWithEvent(sceneTree.selectedItems.changedEvent, () => {
    const { lastSelectedItem } = sceneTree
    if (!lastSelectedItem) return undefined
    const { sceneObject } = lastSelectedItem
    if (!sceneObject) return undefined
    if (!typeNames.includes(sceneObject.typeName)) return undefined
    // if (!(sceneObject instanceof ESImageryLayer) && !(sceneObject instanceof ESMVTLayer)) return undefined
    // if (!(sceneObject instanceof ESImageryLayer)) return undefined;
    return new ImageryController(sceneObject as ESImageryLayer | ESMVTLayer | ESMediaLayer)
  })
  onBeforeUnmount(() => objResetting.destroy())
  chlastSelectedItem()
  const dispose = selectedItems.changedEvent.don(chlastSelectedItem)
  onBeforeUnmount(dispose)
})
</script>

<template>
  <RightList :title="`可视化--${showName}`">
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmAlpha')"> {{ '透明度' }}</label>
      <SliderTime :width="280" v-model:value="czmAlphaSlider" @change="czmAlphaChange" :realVal="`${czmAlpha}`"
        :disabled="!isshow" />
      <span>{{ czmAlpha }}</span>
    </div>
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmContrast')"> {{ '对比度' }}</label>
      <SliderTime :width="280" v-model:value="czmContrastSlider" @change="czmContrastChange" :realVal="`${czmContrast}`"
        :disabled="!isshow" />
      <span>{{ czmContrast }}</span>
    </div>
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmBrightness')"> {{ '亮度' }}</label>
      <SliderTime :width="280" v-model:value="czmBrightnessSlider" @change="czmBrightnessChange"
        :realVal="`${czmBrightness}`" :disabled="!isshow" />
      <span>{{ czmBrightness }}</span>
    </div>
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmHue')"> {{ '色相' }}</label>
      <SliderTime :width="280" v-model:value="czmHueSlider" @change="czmHueChange" :realVal="`${czmHue}`"
        :disabled="!isshow" />
      <span>{{ czmHue }}</span>
    </div>
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmSaturation')"> {{ '饱和度' }}</label>
      <SliderTime :width="280" v-model:value="czmSaturationSlider" @change="czmSaturationChange"
        :realVal="`${czmSaturation}`" :disabled="!isshow" />
      <span>{{ czmSaturation }}</span>
    </div>
    <div class="images_relative_box">
      <label @dblclick="beDefault('czmGamma')"> {{ 'gamma' }}</label>
      <SliderTime :width="280" v-model:value="czmGammaSlider" @change="czmGammaChange" :realVal="`${czmGamma}`"
        :disabled="!isshow" />
      <span>{{ czmGamma }}</span>
    </div>
  </RightList>
</template>
