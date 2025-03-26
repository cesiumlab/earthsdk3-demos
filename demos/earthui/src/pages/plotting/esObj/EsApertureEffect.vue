<template>
    <!-- 选择框 -->
    <PopList :title="'光圈特效'">
        <div class="roam_moveOnLineMode">
            <div>
                <label for="">连续创建</label><span class="roam_moveOnLineMode_checke"
                    :class="{ 'roam_moveOnLineMode_checke_active': continuousCreate }" @click="changeCheckBox">
                    <es-icon :name="continuousCreate ? 'duigou' : ''" :color="'white'" :size="12" />
                </span>
            </div>
        </div>
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
import { ESApertureEffect } from "earthsdk3";
import { ref, onBeforeUnmount, onMounted, inject } from "vue";
import PopList from "../../../components/PopList.vue";
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [//多选模式类型
    {
        mode: 1,
        img: require('../../../assets/plotting/l_ApertureEffect.png'),
        name: '光圈特效'
    },
    {
        mode: 5,
        img: require('../../../assets/plotting/b_ApertureEffect.png'),
        name: '光圈特效'
    }
]
const iconIsShow: any = ref()
const continuousCreate = ref(false)//连续创建
const selected: any = ref(modes[0])
let sceneObject: ESApertureEffect | undefined = undefined
let editingDispose: any
let sce: any
const pos = (position: [number, number, number]) => {
    if (!selected.value) return
    if (!continuousCreate.value) return
    if (sce) {
        sce.editing = false
    }
    setTimeout(() => {
        createSceneObject(position)
    }, 100)
}
const changeCheckBox = () => {//点击取消连续创建时使得光圈特效类型为空
    destroy()
    if (continuousCreate.value) {
        selected.value = undefined
    }
    continuousCreate.value = !continuousCreate.value
}
const select = (item: { mode: number, img: any, name: string, }) => {//点击选择框中的报警按钮
    destroy()
    selected.value = item
    if (continuousCreate.value) return
    createOneSceneObject()
}
//创建光圈特效场景对象
const createSceneObject = (position: [number, number, number]) => {
    if (!selected.value) return
    sce = xbsjEarthUi.createSceneObject(ESApertureEffect) as ESApertureEffect
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESApertureEffect')
    sce.position = position
    sce.radius = selected.value.mode
    sce.name = selected.value.name + (sceneObjectIndex + 1)
    //编辑状态结束后根据json创建在场景树上
    sce.editing = true
    sce.d(sce.editingChanged.disposableOnce(() => {
        if (sce.editing === false) {
            const json = sce.json
            xbsjEarthUi.destroySceneObject(sce)
            createSceneObjTreeItemFromJson(xbsjEarthUi, json)
        }
    }))
}
//创建单个场景对象
const createOneSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESApertureEffect) as ESApertureEffect
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESApertureEffect')
    sceneObject.radius = selected.value.mode
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true
    editingDispose = sceneObject.editingChanged.disposableOnce(() => {
        if (sceneObject && sceneObject.editing === false) {
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
    })
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
    createOneSceneObject()
    const disposes = executePos(xbsjEarthUi, pos)
    onBeforeUnmount(() => {
        if (disposes) {
            disposes.forEach((item) => {
                item && item()
            })
        }
        destroy()
    })
})
</script>
