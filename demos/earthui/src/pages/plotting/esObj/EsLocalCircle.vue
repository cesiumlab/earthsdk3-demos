<template>
    <!-- 选择框 -->
    <PopList :title="'圆'">
        <div class="images_img_list">
            <div v-for="(item, index) in modes" class="images_img_lilist">
                <div class="images_imgposition" @click="select(item)"
                    :class="{ 'images_checkedactive': selected && item.mode === selected.mode }">
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
import { ESLocalCircle } from "earthsdk3";
import { inject, onMounted, ref, onBeforeUnmount } from "vue";
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import {getsceneObjNumfromSceneTree} from "../../../scripts/general"
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [//多选模式类型
    {
        mode: 1,
        img: require('../../../assets/plotting/l_circle.png'),
        name: '圆'
    }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let sceneObject: ESLocalCircle | undefined = undefined
let editingDispose: any=undefined
const select = (item: { mode: number, img: any, name: string, }) => {//点击选择框中的圆按钮
    destroy()
    selected.value = item
    createSceneObject()
}
//创建圆场景对象
const createSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESLocalCircle) as ESLocalCircle
    if(sceneObject){
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESLocalCircle')
        sceneObject.name = selected.value.name+(sceneObjectIndex+1)
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true
    editingDispose=(sceneObject.editingChanged.disposableOnce(() => {
        if (sceneObject&&sceneObject.editing === false) {
            const json = sceneObject.json
            const position = sceneObject.position
            const a = position[0] === 0 && position[1] === 0
            xbsjEarthUi.destroySceneObject(sceneObject)
            sceneObject = undefined
                setTimeout(() => {
                    if (!a) {
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
