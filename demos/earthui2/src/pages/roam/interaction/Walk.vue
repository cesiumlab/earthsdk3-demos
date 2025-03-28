<template>
    <PopList :title="'第一人称'">
        <LabelInput v-if="ueIsShow" v-model="jumpZVelocity" :inputType="'number'" :min="0" :label="'跳跃初始速度'"
            :unit="'m/s'"></LabelInput>
        <div class="interation_text" :style="{ marginTop: ueIsShow ? '20px' : '0' }">
            <div><span>W( ↑ )</span><span>水平方向前进</span></div>
            <div><span>A</span><span>水平方向左移</span></div>
            <div><span>S ( ↓ )</span><span>水平方向后退</span></div>
            <div><span>D</span><span>水平方向右移</span></div>
            <div><span>←</span><span>水平方向左转</span></div>
            <div><span>→</span><span>水平方向右转</span></div>
            <div v-if="ueIsShow"><span>Space</span><span>空格跳跃</span></div>
        </div>
    </PopList>
</template>

<script setup lang="ts">
import { Message, createVueDisposer, toVR } from "earthsdk-ui"
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { inject, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import PopList from '../../../components/PopList.vue';
import LabelInput from "../../../components/LabelInput.vue";
const d = createVueDisposer(onBeforeUnmount);
const jumpZVelocity = ref<number>(4.2)
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])
const position = ref<[number, number, number]>([0, 0, 0])
const ueActorResult = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    let disposeUe = viewer.clickEvent.donce(async e => {
        if (!e.screenPosition) return;
        const result = await viewer.pickPosition(e.screenPosition)
        if (!result) return
        const pos = result.map((num: number) => Number(num.toFixed(7))) as [number, number, number]
        pos[2] += 2
        position.value = pos
        viewer.changeToWalk(position.value, jumpZVelocity.value)
    });
    return disposeUe
}
//调用点击返回拾取信息函数
const dispose = ueActorResult()
const destroy = () => {//销毁
    if (dispose) dispose()
}
watch([jumpZVelocity], () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToWalk(position.value, jumpZVelocity.value)
}, { deep: true })
onMounted(() => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    Message.warning('请点击选择一个位置点')
})
onBeforeUnmount(() => destroy())
</script>
