<template>
    <PopList :title="'并'" :showButton="true" @close="ok" @ok="scene" :leftButton="'计算'" :rightButton="'确认'"
        :showLeftButton="true">
        <LabelInput v-model="onePolyNameId" :disabled="false" :label="'多边形1'" :activeMode="onePolyId" :checkbox="true"
            :list="onePolyList" :checkboxFun="changeOnePolygonShow" :liClickFun="changeOnePolygonId"
            :placeholder="'请选择多边形'"></LabelInput>
        <LabelInput v-model="twoPolyNmaeId" :disabled="false" :label="'多边形2'" :activeMode="twoPolyId" :checkbox="true"
            :list="twoPolyList" :checkboxFun="changeTwoPolygonShow" :liClickFun="changeTwoPolygonId"
            :placeholder="'请选择多边形'"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { ESGeoPolygon, ESSceneObject } from "earthsdk3";
import { ref, inject, onBeforeUnmount } from "vue";
import PopList from "../../../components/PopList.vue";
import { createSceneObjTreeItemFromJson } from "../../plotting/esObj/fun";
import { searchForPolygonValues } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import LabelInput from "../../../components/LabelInput.vue"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
import { ElMessage } from "element-plus";
const emits = defineEmits(['close'])
// 第一个多边形
const onePolyId = ref()
const onePolyList = ref()
const onePolyNameId = ref()
// 第二个多边形
const twoPolyId = ref()
const twoPolyList = ref()
const twoPolyNmaeId = ref()
const position = ref()
const intersectObjList: any = ref([])//存放计算好的在场景中但不在场景树上的对象
const destroy = () => {//销毁计算好的在场景中但不在场景树上的对象
    if (intersectObjList.value.length >= 1) {
        intersectObjList.value.forEach((item: any) => {
            if (item.length >= 1) {
                item.forEach((i: any) => {
                    if (i) {
                        xbsjEarthUi.destroySceneObject(i)
                    }
                })
            }
        })
    }
    intersectObjList.value = []
}

const ok = () => {//点击计算
    destroy()
    if (!onePolyId.value) {
        ElMessage.warning('请选择第一个多边形')
        return
    }
    if (!twoPolyId.value) {
        ElMessage.warning('请选择第二个多边形')
        return
    }
    if (onePolyId.value === twoPolyId.value) {
        ElMessage.warning('请选择不同的多边形')
        return
    }
    const sceneObject = xbsjEarthUi.getSceneObjectById(onePolyId.value) as ESGeoPolygon
    if (!sceneObject) return
    const result = sceneObject.getUnion(position.value)
    if (!result || result.length > 1) {
        ElMessage.warning('两个多边形无并集')
        return
    } else {
        const r = result as [number, number, number][][]
        let sceList: any = []
        r.forEach((item) => {
            const p = item
            const sceObj = xbsjEarthUi.createSceneObject(ESGeoPolygon)
            if (!sceObj) return
            sceObj.points = p
            sceObj.fillColor = [0, 0, 1, 1]
            const sceneObjectNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoPolygon')
            sceObj.name = `并集多边形${sceneObjectNum + 1}`
            sceList.push(sceObj)
            ElMessage.success('计算成功')
        })
        intersectObjList.value.push(sceList)
    }
}
const scene = () => {
    if (intersectObjList.value.length <= 0) {
        ElMessage.warning('请先计算')
        return
    }
    intersectObjList.value[intersectObjList.value.length - 1].forEach((item: any) => {
        const json =item.json
        createSceneObjTreeItemFromJson(xbsjEarthUi, json)
    })
    destroy()
}
//第一个多边形列表是否显示
const changeOnePolygonShow = () => {
    onePolyList.value = searchForPolygonValues(xbsjEarthUi)
    if (onePolyList.value.length <= 0) {
        ElMessage.warning('多边形列表为空，请先创建多边形')
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
        ElMessage.warning('多边形列表为空，请先创建多边形')
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