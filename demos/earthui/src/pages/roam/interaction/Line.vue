<template>
    <PopList :title="'沿线运动'">
        <!-- <LabelInput v-model="lineNameId" :label="'折线id'" :disabled="false" :activeMode="lineId" :checkbox="true"
            :list="linesList" :checkboxFun="changeLinesListShow" :liClickFun="changeLineId" :placeholder="'请选择折线'">
        </LabelInput> -->
        <LabelEnum v-model="lineId" :label="'折线id'" :materialIdList="materialIdList"
            :changeVisibleclick="changeLinesListShow">
        </LabelEnum>
        <LabelInput v-model="speed" :inputType="'number'" :min="0" :label="'运动速度'" :unit="'m/s'"></LabelInput>
        <LabelInput v-model="heightOffset" :inputType="'number'" :label="'抬高高度'" :unit="'m'"></LabelInput>
        <div class="roam_moveOnLineMode" style="margin-top: 10px;">
            <div><label for="">是否循环</label><span class="roam_moveOnLineMode_checke"
                    :class="{ 'roam_moveOnLineMode_checke_active': loop }" @click="loop = !loop">
                    <es-icon :name="loop ? 'duigou' : ''" :color="'white'" :size="12" />
                </span>
            </div>
        </div>
        <LabelInput v-model="turnRateDPS" :inputType="'number'" :min="0" :label="'转弯速度'" :unit="'°/s'"></LabelInput>
        <LabelEnum v-model="lineMode" :label="'线模式'" :materialIdList="[['自动', 'auto'], ['手动', 'manual']]">
        </LabelEnum>
        <!-- <LabelInput v-model="lineNameMode" :label="'线模式'" :disabled="false" :activeMode="lineMode" :checkbox="true"
            :list="listsModeList" :liClickFun="changeLineModeId" :placeholder="'请选择或输入'"></LabelInput> -->
    </PopList>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import PopList from '../../../components/PopList.vue';
import { inject, ref, watch } from 'vue';
import { searchForLineValues } from '../../../scripts/general';
import LabelInput from "../../../components/LabelInput.vue"
import LabelEnum from "../../../components/LabelEnum.vue"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const lineId = ref<string>()
const lineNameId = ref<string>()
const lineNameMode = ref<string>('自动')
const lineMode = ref<'auto' | 'manual'>('auto')
const speed = ref<number>(1)
const heightOffset = ref<number>(1)
const turnRateDPS = ref<number>(10)
const loop = ref<boolean>(true)
const linesList = ref()
const listsModeList = [{
    name: '自动',
    id: 'auto'
}, {
    name: '手动',
    id: 'manual'
}]
const changeLineId = (item: any) => {
    lineId.value = item.id
    lineNameId.value = item.name
}
const changeLineModeId = (item: any) => {
    lineMode.value = item.id
    lineNameMode.value = item.name
}
const materialIdList = ref()
// const changeLinesListShow = () => {
//     const sceneTree = xbsjEarthUi.getSceneTree()
//     if (!sceneTree) return
//     linesList.value = searchForLineValues(sceneTree)
//     if (linesList.value.length <= 0) {
//         ElMessage.warning('折线列表为空，请先创建折线')
//         return
//     }
// }
const changeLinesListShow = () => {
    const sceneTree = xbsjEarthUi.getSceneTree()
    if (!sceneTree) return
    materialIdList.value = searchForLineValues(sceneTree)
    if (materialIdList.value.length <= 0) {
        ElMessage.warning('折线列表为空，请先创建折线')
    }
}
watch([lineId, speed, heightOffset, loop, turnRateDPS, lineMode], () => {
    okLine()
})


const okLine = () => {
    if (!lineId.value) {
        ElMessage.warning('请选择一条折线')
        return
    }
    if (!speed.value) {
        ElMessage.warning('请填写速度')
        return
    }
    if (!turnRateDPS.value) {
        ElMessage.warning('请填写转弯速度')
        return
    }
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToLine(lineId.value, speed.value, heightOffset.value, loop.value, turnRateDPS.value, lineMode.value)
    xbsjEarthUi.roamMode = 'Line'
}
</script>
