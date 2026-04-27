<template>
  <PopList :title="'地球基础颜色'">
    <div class="roam_pick" style="margin-top: 10px">
      <label class="content_item_fix">颜色</label>
      <div style="width: 190px">
        <ESColorPicker v-model="sceneGlobeBaseColor" :size="'mini'" />
      </div>
    </div>
  </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, ESColorPicker, toVR } from 'earthsdk-ui'
import { inject, onBeforeUnmount } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { ESJColor } from 'earthsdk3'

const d = createVueDisposer(onBeforeUnmount)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneGlobeBaseColor = toVR<ESJColor>(d, [
  xbsjEarthUi.activeViewer,
  'sceneGlobeBaseColor'
])

</script>
<style scoped>
.content_item_fix {
  color: var(--el-text-color-regular);
}
</style>
