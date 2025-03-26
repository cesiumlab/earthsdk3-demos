<template>
    <PopList :title="'缓冲'" :showButton="true" @close="ok" @ok="scene" :leftButton="'计算'" :rightButton="'确认'"
        :showLeftButton="true">
        <LabelInput v-model="onePolyName" :activeMode="onePolyId" :disabled="false" :label="'折线'" :checkbox="true"
            :list="onePolyList" :checkboxFun="changeOnePolygonShow" :liClickFun="changeOnePolygonId"
            :placeholder="'请选择折线'"></LabelInput>
        <LabelInput v-model="radius" :inputType="'number'" :label="'缓冲阈值'"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui"
import { ESGeoLineString, ESGeoPolygon, ESSceneObject } from "earthsdk3";
import { ref, inject, onBeforeUnmount } from "vue";
import PopList from "../../../components/PopList.vue";
import { createSceneObjTreeItemFromJson } from "../../plotting/esObj/fun";
import { searchForLineValues } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import LabelInput from "../../../components/LabelInput.vue";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
const emits = defineEmits(['close'])

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
// 折线
const onePolyId = ref()
const onePolyName = ref('')
const onePolyList = ref()
// 缓冲高度
const radius = ref(50)
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
    intersectObjList.value = []
    if (!onePolyId.value) {
        Message.warning('请选择一条折线')
        return
    }
    if (!radius.value) {
        Message.warning('请输入缓冲阈值')
        return
    }
    const sceneObject = xbsjEarthUi.getSceneObjectById(onePolyId.value) as ESGeoLineString
    if (!sceneObject) return
    const re = sceneObject.getBuffer(radius.value)
    if (!re) {
        Message.warning('缓冲结果不存在')
        return
    } else {
        const r = re as [number, number, number][][]
        let sceList: any = []
        r.forEach((item, index: number) => {
            const p = item
            const sceObj = xbsjEarthUi.createSceneObject(ESGeoPolygon)
            if (!sceObj) return
            sceObj.points = p
            const sceneObjectNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoPolygon')
            sceObj.fillColor = [0, 0, 1, 1]

            sceObj.name = `缓冲多边形` + (sceneObjectNum + 1)
            sceList.push(sceObj)
            Message.success('计算成功')
        })
        intersectObjList.value.push(sceList)
    }
}
const scene = () => {
    if (intersectObjList.value.length <= 0) {
        Message.warning('请先计算')
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
    onePolyList.value = searchForLineValues(xbsjEarthUi)
    if (onePolyList.value.length <= 0) {
        Message.warning('折线列表为空，请先创建折线')
        return
    }
}
// 选择第一个多边形
const changeOnePolygonId = (item: any) => {
    onePolyId.value = item.id
    onePolyName.value = item.name
}
onBeforeUnmount(() => {
    destroy()
})
</script>