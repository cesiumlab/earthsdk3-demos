<template>
    <!-- 选择框 -->
    <PopList :title="'车辆'">
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
import { ESCar } from "earthsdk3";
import { ref, onBeforeUnmount, onMounted, inject } from "vue";
import PopList from "../../../components/PopList.vue";
import { createSceneObjTreeItemFromJson, executePos } from "./fun";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general";
import { Message } from "earthsdk-ui";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const modes = [//多选模式类型
    {
        mode: 'policeCar',
        img: new URL('../../../assets/plotting/policecar.png',import.meta.url).href,
        name: '警车'
    },
]
const iconIsShow: any = ref()
const continuousCreate = ref(false)//连续创建
const selected: any = ref(modes[0])
let sceneObject: ESCar | undefined = undefined
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

const changeCheckBox = () => {//点击取消连续创建时使得车辆类型为空
    destroy()
    if (continuousCreate.value) {
        selected.value = undefined
    }
    continuousCreate.value = !continuousCreate.value
    if (continuousCreate.value) {
        Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
    } else {
        Message.remove('xxx')
    }
}
const select = (item: { mode: string, img: any, name: string, }) => {//点击选择框中的车辆按钮
    destroy()
    selected.value = item
    if (continuousCreate.value) return
    createOneSceneObject()
}

//创建车辆场景对象
const createSceneObject = (position: [number, number, number]) => {
    if (!selected.value) return
    sce = xbsjEarthUi.createSceneObject(ESCar) as ESCar
    sce.position = position
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESCar')
    sce.mode = selected.value.mode
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
//创建单个报警场景对象
const createOneSceneObject = () => {
    if (!selected.value) return
    sceneObject = xbsjEarthUi.createSceneObject(ESCar) as ESCar
    sceneObject.mode = selected.value.mode
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESCar')
    sceneObject.name = selected.value.name + (sceneObjectIndex + 1)
    //编辑状态结束后根据json创建在场景树上
    sceneObject.editing = true
    Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
    editingDispose = sceneObject.editingChanged.disposableOnce(() => {
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
        Message.remove('xxx')
        if (disposes) {
            disposes.forEach((item) => {
                item && item()
            })
        }
        destroy()
    })
})
</script>
