<template>
    <!-- 选择框 -->
    <PopList :title="'表面积测量'" :showButton="true" @ok="start" :rightButton="'开始分析'">
        <LabelInput v-model="interpolation" :label="'采样间距'" :inputType="'number'" :unit="'m'" >
        </LabelInput>
        <LabelInput v-model="offsetHeight" :label="'偏移高度'" :inputType="'number'" :unit="'m'"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { inject, onBeforeUnmount, onMounted } from "vue";
import { createVueDisposer, toVR } from 'earthsdk-ui';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);

let surfaceAreaMeasurement = xbsjEarthUi.createSceneObject("ESSurfaceAreaMeasurement") as any;
// 插值距离
let interpolation = toVR<number>(d, [surfaceAreaMeasurement, "interpolation"])
// 偏移高度
let offsetHeight = toVR<number>(d, [surfaceAreaMeasurement, "offsetHeight"])
offsetHeight.value = 1
const emits = defineEmits(['close'])
const start = () => {
    if (surfaceAreaMeasurement && surfaceAreaMeasurement.editing) {
        Message.warning('请双击结束编辑之后进行分析')
        return
    }
    // interpolation.value = Number((Math.sqrt(surfaceAreaMeasurement.area / xbsjEarthUi.Interpolation)).toFixed(2))
    surfaceAreaMeasurement.start()
}
let dispose: any
onMounted(() => {
    if (surfaceAreaMeasurement) {
        surfaceAreaMeasurement.editing = true
        Message.warning('结束编辑之后请点击开始分析')
        offsetHeight.value = 1
    }
    dispose = surfaceAreaMeasurement.editingChanged.disposableOn(() => {
        if (surfaceAreaMeasurement.editing === false) {
            interpolation.value = Number((Math.sqrt(surfaceAreaMeasurement.area / xbsjEarthUi.Interpolation)).toFixed(2))
        }
    })
})
onBeforeUnmount(() => {
    if (surfaceAreaMeasurement) {
        surfaceAreaMeasurement.editing = false
        xbsjEarthUi.destroySceneObject(surfaceAreaMeasurement)
        surfaceAreaMeasurement = undefined
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
})
</script>
