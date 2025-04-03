<template>
    <!-- 选择框 -->
    <PopList :title="'自定义DIV'">
        <div class="images_img_list">
            <div v-for="(item, index) in modes" class="images_img_lilist">
                <div class="images_imgposition" @click="select(item)"
                    :class="{ 'images_checkedactive': selected && item.mode === selected.mode }">
                    <img :src="item.img" alt="">
                    <span v-show="iconIsShow == index ? true : false">{{ item.name ?? '模式' }}</span>
                </div>
                <div class="images_onlineimageName" @mouseenter="iconIsShow = index" @mouseleave="iconIsShow = null"
                    v-if="inputIndex !== index" @dblclick="inputIndex = index" title="双击可编辑名称">{{
        item.name ?? '模式' }}</div>
                <input class="images_onlineimageName_input" type="text" v-model="item.name" @blur="inputIndex = -1"
                    @keydown.enter="inputIndex = -1" v-else>
            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import PopList from "../../../components/PopList.vue";
import { ESGeoDiv } from "earthsdk3";
import { inject, onMounted, ref, onBeforeUnmount } from "vue";
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import {getsceneObjNumfromSceneTree} from "../../../scripts/general"
import { Message } from "earthsdk-ui";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const inputIndex = ref(-1)

const modes = [//多选模式类型
    {
        mode: 'DIV',
        img: new URL('../../../assets/plotting/geodiv.png',import.meta.url).href,
        name: '自定义DIV'
    },
]
const iconIsShow: any = ref()
const selected: any = ref(modes[0])
let editingDispose: any = undefined
let sceneObject: ESGeoDiv | undefined = undefined
const select = (item: { mode: string, img: any, name: string }) => {//点击选择框中的天空盒按钮
    destroy()
    selected.value = item
    createSceneObject()
}

//创建自定义DIV场景对象
const createSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESGeoDiv) as ESGeoDiv
    if (sceneObject) {
        const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoDiv')
        sceneObject.name = selected.value.name+(sceneObjectIndex+1)
        sceneObject.innerHTML = `<div style="width: auto; height: 50px;white-space: nowrap; background: rgba(120, 120, 0, 0.7); color: white; font-size: 30px; line-height: 50px; border: 1px solid white;">${selected.value.name}</div>`
        //编辑状态结束后根据json创建在场景树上
        sceneObject.editing = true
        Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
        editingDispose = (sceneObject.editingChanged.disposableOnce(() => {
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
