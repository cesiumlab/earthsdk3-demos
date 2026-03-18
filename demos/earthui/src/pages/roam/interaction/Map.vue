<template>
  <PopList :title="'默认'">
    <div class="interation_text">
      <p>鼠标左键 (平移)</p>
      <p>鼠标右键 (旋转)</p>
      <p>鼠标中键 (翻转)</p>
      <p>鼠标滚轮 (缩放)</p>
    </div>

    <div class="poplist_head">
      <div class="roam_custom_head_left"><span></span> 相机运动范围</div>
    </div>
    <div class="poplist_content">

      <ESLabelSlider class="content_item" v-model="west" :min="-180" :max="180">
        <template #prefix>
          <span class="content_item_fix">西经(W)</span>
        </template>
        <template #suffix>
          <span class="content_item_fix">°</span>
        </template>
      </ESLabelSlider>

      <ESLabelSlider class="content_item" v-model="south" :min="-90" :max="90">
        <template #prefix>
          <span class="content_item_fix">南纬(S)</span>
        </template>
        <template #suffix>
          <span class="content_item_fix">°</span>
        </template>
      </ESLabelSlider>

      <ESLabelSlider class="content_item" v-model="east" :min="-180" :max="180">
        <template #prefix>
          <span class="content_item_fix">东经(E)</span>
        </template>
        <template #suffix>
          <span class="content_item_fix">°</span>
        </template>
      </ESLabelSlider>

      <ESLabelSlider class="content_item" v-model="north" :min="-90" :max="90">
        <template #prefix>
          <span class="content_item_fix">北纬(N)</span>
        </template>
        <template #suffix>
          <span class="content_item_fix">°</span>
        </template>
      </ESLabelSlider>

      <ElInput class="content_item" v-model.number="minHeight" placeholder="请输入最小高度">
        <template #prefix>
          <span>最小高度</span>
        </template>
        <template #suffix>
          <span>m</span>
        </template>
      </ElInput>

      <ElInput class="content_item" v-model.number="maxHeight" placeholder="请输入最大高度">
        <template #prefix>
          <span>最大高度</span>
        </template>
        <template #suffix>
          <span>m</span>
        </template>
      </ElInput>

    </div>
  </PopList>
</template>
<script setup lang="ts">
import PopList from '@/components/PopList.vue'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { ESLabelSlider } from 'earthsdk-ui'
import { ESJGeoRegion } from 'earthsdk3'
import { ElInput } from 'element-plus'
import { inject, onMounted, ref, watch } from 'vue'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const west = ref(-180) //西经
const south = ref(-90) //南纬
const east = ref(180) //东经
const north = ref(90) //北纬
const minHeight = ref(0) //最低高度
const maxHeight = ref(100000000) //最高高度

onMounted(() => {
  const defaults = [-180, -90, 180, 90, 0, 100000000];
  if (xbsjEarthUi.activeViewer?.cameraMovableRegion) {
    const cameraMovableRegion = xbsjEarthUi.activeViewer.cameraMovableRegion
    west.value = cameraMovableRegion[0] ?? defaults[0]
    south.value = cameraMovableRegion[1] ?? defaults[1]
    east.value = cameraMovableRegion[2] ?? defaults[2]
    north.value = cameraMovableRegion[3] ?? defaults[3]
    minHeight.value = cameraMovableRegion[4] ?? defaults[4]
    maxHeight.value = cameraMovableRegion[5] ?? defaults[5]
  } else {
    west.value = defaults[0]
    south.value = defaults[1]
    east.value = defaults[2]
    north.value = defaults[3]
    minHeight.value = defaults[4]
    maxHeight.value = defaults[5]
  }
})

watch([
  west, south,
  east, north,
  minHeight, maxHeight
], () => {
  if (!xbsjEarthUi.activeViewer) return;
  const cameraMovableRegion = [west.value, south.value, east.value, north.value, minHeight.value, maxHeight.value]
  console.log('cameraMovableRegion', cameraMovableRegion);
  xbsjEarthUi.activeViewer.cameraMovableRegion = [...cameraMovableRegion] as ESJGeoRegion
})



</script>
<style scoped lang="scss">
.interation_text {
  width: 100%;
  display: grid;
  // 两行两列
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  p {
    font-size: 12px;
    margin: 0;
    margin-bottom: 10px;
    color: var(--el-text-color-primary);
  }
}

.poplist_head {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  border-bottom: var(--el-border);
  font-size: 12px;
}

.roam_custom_head_left {
  position: relative;
  color: var(--el-text-color-primary);
  user-select: none;
}

.roam_custom_head_left>span {
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 1px;
  background: var(--el-color-primary);
}

.poplist_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.content_item {
  width: 100%;
  margin-top: 15px;
}

.content_item_fix {
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
</style>
