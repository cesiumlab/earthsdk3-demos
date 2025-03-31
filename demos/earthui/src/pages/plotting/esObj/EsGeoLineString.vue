<template>
    <!-- 选择框 -->
    <PopList :title="'折线'">
        <div class="images_img_list">
            <div v-for="(item, index) in modes" class="images_img_lilist">
                <div class="images_imgposition" @click="select(item)"
                    :class="{ 'images_checkedactive': selected && item.name === selected.name }">
                    <img :src="item.img" alt="">
                    <span v-show="iconIsShow == index ? true : false">{{ item.name ?? '模式' }}</span>
                </div>
                <div class="images_onlineimageName" @mouseenter="iconIsShow = index" @mouseleave="iconIsShow = null">{{
        item.name ?? '模式' }}</div>
            </div>
        </div>
    </PopList>
</template>

<script setup lang="ts">
import { ESGeoLineString } from "earthsdk3";
import { inject, onMounted, ref, onBeforeUnmount } from "vue";
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
    {
        img: new URL('../../../assets/plotting/w_line.png',import.meta.url).href,
        name: '白色折线',
        type: {
            strokeWidth: 1,
            strokeColor: [1, 1, 1, 1]
        }
    },
    {
        img: new URL('../../../assets/plotting/r_line.png',import.meta.url).href,
        name: '红色折线',
        type: {
            strokeWidth: 3,
            strokeColor: [1, 0, 0, 1]
        }
    }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESGeoLineString | undefined = undefined
const select = (item: { type: { strokeWidth: number, strokeColor: number[] }, img: any, name: string, }) => {//点击选择框中的折线按钮
    destroy()
    selected.value = item
    createSceneObject()
}
//创建折线场景对象
const createSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESGeoLineString) as ESGeoLineString
    if (sceneObject) {
        const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoLineString')
        sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
        sceneObject.strokeWidth = selected.value.type.strokeWidth
        sceneObject.strokeColor = selected.value.type.strokeColor
        //编辑状态结束后根据json创建在场景树上
        sceneObject.editing = true
        editingDispose = (sceneObject.editingChanged.disposableWeakOn(() => {
            if (sceneObject && sceneObject.editing === false) {
                const json = sceneObject.json
                const pos = sceneObject.points?.length
                xbsjEarthUi.destroySceneObject(sceneObject)
                sceneObject = undefined
                setTimeout(() => {
                    if (pos && pos >= 2) {
                        createSceneObjTreeItemFromJson(xbsjEarthUi, json)
                        selected.value = undefined
                    }
                }, 300)
            }
        }))
    }

}
const destroy = () => {
    if (sceneObject && sceneObject.editing) {
        if (editingDispose) {
            editingDispose()
            editingDispose = undefined
        }
        sceneObject.editing = false
        xbsjEarthUi.destroySceneObject(sceneObject)
        sceneObject = undefined
    }
}
onMounted(() => {
    createSceneObject()
    onBeforeUnmount(() => {
        destroy()
    })
})
</script>
