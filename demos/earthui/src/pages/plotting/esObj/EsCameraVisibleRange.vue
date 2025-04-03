<template>
    <!-- 选择框 -->
    <PopList :title="'摄像头'">
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
import { ESCameraVisibleRange } from "earthsdk3";
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import PopList from "../../../components/PopList.vue";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { createSceneObjTreeItemFromJson } from "./fun";
import { Message } from "earthsdk-ui";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [
    {
        img: new URL('../../../assets/plotting/cameraVisibleRange.png', import.meta.url).href,
        name: '摄像头',
        mode: 90

    }
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESCameraVisibleRange | undefined = undefined

const select = (item: { mode: number, img: any, name: string, }) => {//点击选择框中的摄像头按钮
    destroy()
    selected.value = item
    createSceneObject()
}

//创建摄像头场景对象
const createSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESCameraVisibleRange) as ESCameraVisibleRange
    if (sceneObject) {
        const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESCameraVisibleRange')
        sceneObject.fov = selected.value.mode
        sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
        //编辑状态结束后根据json创建在场景树上
        sceneObject.editing = true
        Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
        editingDispose = (sceneObject.editingChanged.disposableWeakOn(() => {
            if (sceneObject && sceneObject.editing === false) {
                Message.remove('xxx')
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
        Message.remove('xxx')
        destroy()
    })
})

</script>
