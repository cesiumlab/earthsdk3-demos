<template>
  <PopList :title="'场景背景颜色'">
    <div class="roam_pick" style="margin-top: 10px">
      <label class="content_item_fix">颜色</label>
      <div style="width: 190px">
        <ESColorPicker v-model="sceneBackgroundColor" :size="'mini'" />
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR, ESColorPicker } from 'earthsdk-ui'
import { ESJColor } from 'earthsdk3'
import { inject, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneBackgroundColor = toVR<ESJColor>(d, [
  xbsjEarthUi.activeViewer,
  'sceneBackgroundColor'
]) //场景背景颜色

</script>
<style scoped>
.content_item_fix {
  color: var(--el-text-color-regular);
}
</style>
