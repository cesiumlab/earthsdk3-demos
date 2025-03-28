<template>
    <!-- 选择框 -->
    <PopList :title="'断面分析'" :showButton="true" @close="restart" @ok="start" :leftButton="'重新绘制'" :rightButton="'开始分析'"
        :showLeftButton="true">
        <LabelInput v-model="sectionalNumber" :inputType="'number'" :label="'插值个数'" :unit="'个'" :min="0"></LabelInput>

    </PopList>
    <SectionalEcharts :heightList=heightList v-if="heightList.length > 1"></SectionalEcharts>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESGeoLineString, ESHuman } from "earthsdk3";
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import SectionalEcharts from "./SectionalEcharts.vue";
import { ESCesiumViewer } from "earthsdk3-cesium";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
let esGeoLineString = xbsjEarthUi.createSceneObject(ESGeoLineString) as any;
const sectionalNumber = ref(10)
const emits = defineEmits(['close'])
const heightList = ref<number[]>([])
// 定义一个计算插值点的函数
function getInterpolatedPoints(points: [number, number, number][], count: number) {
    let pointsList: [number, number][] = []
    const pointlon = points[0][0]
    const pointlat = points[0][1]
    pointsList.push([pointlon, pointlat])
    const lonDifference = (points[1][0] - points[0][0]) / (count - 1)//精度差值
    const latDifference = (points[1][1] - points[0][1]) / (count - 1)//纬度差值
    for (let index = 0; index < count - 1; index++) {
        pointsList.push([pointlon + lonDifference * (index + 1), pointlat + latDifference * (index + 1)])
    }
    return pointsList
}
const start = async () => {
    if (heightList.value.length > 0) {
        Message.warning('请点击重新绘制，开始分析')
        return
    }
    if (esGeoLineString && esGeoLineString.editing === true) {
        Message.warning('请双击结束编辑之后点击开始分析')
        return
    }
    if (!sectionalNumber.value) {
        Message.warning('插值个数不能为空')
        return
    }
    const points = [...esGeoLineString.points]
    if (points.length > 1) {
        const result = getInterpolatedPoints(points, Math.round(sectionalNumber.value))
        const viewer = xbsjEarthUi.activeViewer
        if (viewer) {
            const Heights = await viewer.getHeightsByLonLats(result, 'channel') as number[]
            heightList.value = Heights
        }
    }
}
const restart = () => {
    esGeoLineString.points = []
    esGeoLineString.editing = true
    heightList.value = []
}
let dispose: any
onMounted(() => {
    // PositionsEditing.defaultConfig.noModifingAfterAdding = true;
    if (esGeoLineString) {
        esGeoLineString.editing = true
        Message.warning('点击两个点结束编辑之后请点击开始分析')
    }
    dispose = esGeoLineString.pointsChanged.disposableOn(() => {
        const length = xbsjEarthUi.activeViewer instanceof ESCesiumViewer ? 3 : 2
        // console.log(esGeoLineString.points.length);

        if (esGeoLineString.points.length === length) {
            esGeoLineString.editing = false
            // if (esGeoLineString.points.length === length) {
            //     const p = [...esGeoLineString.points]
            //     p.pop()
            //     esGeoLineString.points = p
            // }
        }
    })
})
onBeforeUnmount(() => {
    // PositionsEditing.defaultConfig.noModifingAfterAdding = false;
    if (esGeoLineString) {
        esGeoLineString.editing = false
        xbsjEarthUi.destroySceneObject(esGeoLineString)
        esGeoLineString = undefined
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
})
</script>
