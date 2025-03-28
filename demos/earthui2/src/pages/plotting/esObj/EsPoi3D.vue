<template>
    <!-- 选择框 -->
    <PopList :title="'Poi3D'">
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
import { ESPoi3D } from "earthsdk3";
import { onBeforeUnmount, ref, onMounted, inject } from "vue";
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const inputIndex = ref(-1)

const modes = [//多选模式类型
    {
        mode: 'triangle',
        img: require('../../../assets/plotting/triangle.png'),
        name: '三角形poi'
    },
    {
        mode: 'diamond',
        img: require('../../../assets/plotting/diamond.png'),
        name: '菱形poi'
    }
]
const iconIsShow: any = ref()
const continuousCreate = ref(false)//连续创建
const selected: any = ref(modes[0])
let sceneObject: ESPoi3D | undefined = undefined
let editingDispose: any = undefined
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
const changeCheckBox = () => {//点击取消连续创建时使得报警类型为空
    destroy()
    if (continuousCreate.value) {
        selected.value = undefined
    }
    continuousCreate.value = !continuousCreate.value
}
const select = (item: { mode: string, img: any, name: string, }) => {//点击选择框中的poi3D按钮
    destroy()
    selected.value = item
    if (continuousCreate.value) return
    createOneSceneObject()
}
//连续创建场景对象
const createSceneObject = (position: [number, number, number]) => {
    if (!selected.value) return
    sce = xbsjEarthUi.createSceneObject(ESPoi3D)
    if (sce) {
        sce.position = position
        sce.mode = selected.value.mode
        const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPoi3D')
        sce.name = selected.value.name + (sceneObjectIndex + 1)
        sce.editing = true
        //编辑状态结束后根据json创建在场景树上
        sce.d(sce.editingChanged.disposableWeakOn(() => {
            if (sce.editing === false) {
                const json = sce.json
                xbsjEarthUi.destroySceneObject(sce)
                createSceneObjTreeItemFromJson(xbsjEarthUi, json)
            }
        }))
    }
}
//创建单个报场景对象
const createOneSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESPoi3D)
    if (sceneObject) {
        sceneObject.mode = selected.value.mode
        const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESPoi3D')
        sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
        //编辑状态结束后根据json创建在场景树上
        sceneObject.editing = true
        editingDispose = sceneObject.editingChanged.disposableWeakOn(() => {
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
