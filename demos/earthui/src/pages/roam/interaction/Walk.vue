<template>
  <PopList :title="'第一人称'">
    <div class="interation_text">
      <p>水平方向前进 W ( ↑ )</p>
      <p>水平方向左移 A</p>
      <p>水平方向后退 S ( ↓ )</p>
      <p>水平方向右移 D</p>
      <p>水平方向左转 ←</p>
      <p>水平方向右转 →</p>
      <p v-if="activeViewerType === 'ESUeViewer'">空格跳跃 Space</p>
    </div>

    <PoplistHeader title="运动参数" />

    <ElInput class="content_item" v-model="eyeHeight" type="number" placeholder="请输入人眼高度值">
      <template #prefix>
        <span>人眼高度</span>
      </template>
      <template #suffix>
        <span>m</span>
      </template>
    </ElInput>

    <ElInput class="content_item" v-if="activeViewerType === 'ESUeViewer'" v-model="jumpZVelocity" type="number"
      placeholder="请输入速度值">
      <template #prefix>
        <span>跳跃初速度</span>
      </template>
      <template #suffix>
        <span>m/s</span>
      </template>
    </ElInput>
  </PopList>
</template>

<script setup lang="ts">
import PopList from '@/components/PopList.vue'
import PoplistHeader from '@/components/PoplistHeader.vue'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
import { ElInput, ElMessage } from 'element-plus'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const d = createVueDisposer(onBeforeUnmount)

const jumpZVelocity = ref<number>(4.2)
const eyeHeight = ref<number>(1.6)

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])
const position = ref<[number, number, number]>([0, 0, 0]);

const ueActorResult = () => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  let disposeUe = viewer.clickEvent.donce(async (e) => {
    if (!e.screenPosition) return
    const result = await viewer.pickPosition(e.screenPosition)
    if (!result) return
    const pos = result.map((num: number) => Number(num.toFixed(7))) as [number, number, number]
    pos[2] += 2
    position.value = pos
    viewer.changeToWalk(position.value, jumpZVelocity.value)
  })
  return disposeUe
}

//调用点击返回拾取信息函数
const dispose = ueActorResult()
const destroy = () => {
  //销毁
  if (dispose) dispose()
}
watch(
  [jumpZVelocity, eyeHeight],
  () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToWalk(position.value, jumpZVelocity.value, eyeHeight.value)
  },
  { deep: true }
)

onMounted(() => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer.changeToMap();
  ElMessage.warning({ message: '请点击地球选择一个位置作为漫游起点', duration: 6000 });
})
onBeforeUnmount(() => destroy())
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

.content_item {
  width: 100%;
  margin-top: 15px;
}
</style>
