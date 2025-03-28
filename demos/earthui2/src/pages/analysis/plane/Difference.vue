<template>
    <PopList :title="'计算差异'" :showButton="true" @close="ok" @ok="scene" :leftButton="'计算'" :rightButton="'确认'"
        :showLeftButton="true">
        <LabelInput v-model="onePolyNameId" :activeMode="onePolyId" :disabled="false" :label="'多边形1'" :checkbox="true"
            :list="onePolyList" :checkboxFun="changeOnePolygonShow" :liClickFun="changeOnePolygonId"
            :placeholder="'请选择多边形'"></LabelInput>
        <LabelInput v-model="twoPolyNmaeId" :activeMode="twoPolyId" :disabled="false" :label="'多边形2'" :checkbox="true"
            :list="twoPolyList" :checkboxFun="changeTwoPolygonShow" :liClickFun="changeTwoPolygonId"
            :placeholder="'请选择多边形'"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui"
import { ESGeoPolygon, ESPolygonWithHole, ESSceneObject } from "earthsdk3";
import { ref, inject, onBeforeUnmount } from "vue";
import PopList from "../../../components/PopList.vue";
import { createSceneObjTreeItemFromJson } from "../../plotting/esObj/fun";
import { searchForPolygonValues } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close'])
import LabelInput from "../../../components/LabelInput.vue"
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"

// 第一个多边形
const onePolyId = ref()
const onePolyNameId = ref()
const onePolyList = ref()
// 第二个多边形
const twoPolyId = ref()
const twoPolyNmaeId = ref()
const twoPolyList = ref()
const position = ref()
const intersectObjList: any = ref([])//存放计算好的在场景中但不在场景树上的对象
const destroy = () => {//销毁计算好的在场景中但不在场景树上的对象
    if (intersectObjList.value.length >= 1) {
        intersectObjList.value.forEach((item: any) => {
            if (item) {
                xbsjEarthUi.destroySceneObject(item)
            }
        })
    }
    intersectObjList.value = []
}
const ok = () => {//点击计算
    destroy()
    if (!onePolyId.value) {
        Message.warning('请选择第一个多边形')
        return
    }
    if (!twoPolyId.value) {
        Message.warning('请选择第二个多边形')
        return
    }
    if (onePolyId.value === twoPolyId.value) {
        Message.warning('请选择不同的多边形')
        return
    }
    const sceneObject = xbsjEarthUi.getSceneObjectById(onePolyId.value) as ESGeoPolygon
    if (!sceneObject) return
    const result = sceneObject.getDifference(position.value)
    // console.log('result', result);
    if (result && result.status === 'included') {
        const position = result.positions as [number, number, number][][]
        const sceObj = xbsjEarthUi.createSceneObject(ESPolygonWithHole)
        if (!sceObj) return
        sceObj.points = position[0]
        sceObj.innerRings = [position[1]]
        const sceneObjectNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPolygonWithHole')
        sceObj.name = `差异多边形` + (sceneObjectNum + 1);
        intersectObjList.value.push(sceObj)
        Message.success('计算差异多边形成功')
    } else if (result && result.status === 'notIncluded') {
        const position = result.positions as number[][][]
        position.forEach((item: any) => {
            const sceObj = xbsjEarthUi.createSceneObject(ESGeoPolygon)
            if (!sceObj) return
            sceObj.points = item
            const sceneObjectNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoPolygon')
            sceObj.name = `差异多边形` + (sceneObjectNum + 1);
            intersectObjList.value.push(sceObj)
        })
        Message.success('计算差异多边形成功')
    } else {
        Message.warning('无法计算这两个多边形的差异')
    }
}
const scene = () => {
    if (intersectObjList.value.length <= 0) {
        Message.warning('请先计算')
        return
    }
    intersectObjList.value.forEach((item: any) => {
        const json =item.json
        createSceneObjTreeItemFromJson(xbsjEarthUi, json)
    })
    destroy()

}
//第一个多边形列表是否显示
const changeOnePolygonShow = () => {
    onePolyList.value = searchForPolygonValues(xbsjEarthUi)
    if (onePolyList.value.length <= 0) {
        Message.warning('多边形列表为空，请先创建多边形')
        return
    }
}
// 选择第一个多边形
const changeOnePolygonId = (item: any) => {
    onePolyId.value = item.id
    onePolyNameId.value = item.name
}

////第二个多边形列表是否显示
const changeTwoPolygonShow = () => {
    twoPolyList.value = searchForPolygonValues(xbsjEarthUi)
    if (twoPolyList.value.length <= 0) {
        Message.warning('多边形列表为空，请先创建多边形')
        return
    }
}
// 选择第二个多边形
const changeTwoPolygonId = (item: any) => {
    twoPolyId.value = item.id
    twoPolyNmaeId.value = item.name
    position.value = item.position
}
onBeforeUnmount(() => {
    destroy()
})
</script>