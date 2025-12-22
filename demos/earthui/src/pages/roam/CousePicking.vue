<script setup lang='ts'>
import Picking from "./cousePicking/Picking.vue"
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import Button from '../../components/Button.vue';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import RightList from '../../components/RightList.vue';
import { ES3DTileset, ESGeoJson, SceneTree } from 'earthsdk3';
import { ElMessage } from 'element-plus'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const mousePick = ref(false)
const checkedColor = ref<[number, number, number, number]>([1, 0, 0, 1])
const propertyIsShow = ref(false)
const destroyClick = () => {
    if (dispose) {
        dispose()
        dispose = null
    }
}
let dispose: any = null
let sceneobject: ES3DTileset
function isAllDigits(str: any) {
    return str && !isNaN(str)
}
onMounted(() => {
    const update = () => {
        const viewer = xbsjEarthUi.activeViewer
        dispose = viewer?.clickEvent.don(async e => {
            if (!e.screenPosition) return
            if (!mousePick.value) return
            let result = undefined
            const res = await viewer.pick(e.screenPosition)
            if (res) {
                result = res
            }
            // if (!result) return
            console.log('result', result);
            if (result && result.sceneObject) {
                const treeItem = sceneTree.getTreeItemFromSceneObjId(result.sceneObject.id)
                if (treeItem) {
                    const uiTreeObj = treeItem.uiTreeObject
                    sceneTree.uiTree.clearAllSelectedItems()
                    uiTreeObj.selected = true
                    xbsjEarthUi.propSceneTree = treeItem
                }
                if (result.geojsonPickInfo && result.sceneObject instanceof ESGeoJson) {
                    const geojsonPickInfo = result.geojsonPickInfo
                    if (geojsonPickInfo) {
                        const properties = geojsonPickInfo.properties
                        const geometry = geojsonPickInfo.geometry
                        if (propertyIsShow.value) return
                        if (properties && geometry) {
                            xbsjEarthUi.pickResult = {
                                value: { ...properties, ...geometry },
                                name: 'geojson对象属性'
                            }
                        } else {
                            xbsjEarthUi.pickResult = {
                                value: { ...geojsonPickInfo },
                                name: 'geojson对象属性'
                            }
                        }

                    }
                }
                if (result.sceneObject instanceof ES3DTileset) {
                    sceneobject = result.sceneObject
                    sceneobject.resetFeatureStyle()
                    //@ts-ignore
                    const list = result.tilesetPickInfo
                    if (list && Object.keys(list).length !== 0) {
                        const id = list.id
                        if (id) {
                            const style = [
                                { value: id, rgba: checkedColor.value },
                            ]
                            result.sceneObject.setFeatureColor('id', style)
                        } else {
                            ElMessage.warning('未在该瓦片的属性表中找到ID字段，无法实现选中着色功能。')
                        }
                        if (propertyIsShow.value) return
                        for (let key in list) {
                            if (key !== 'name' && !key.includes('id') && !key.includes('ID')) {
                                if (isAllDigits(list[key])) {
                                    list[key] = Number(list[key]).toFixed(2)
                                }
                            }
                        }
                        xbsjEarthUi.pickResult = {
                            value: list,
                            name: '3DTileset对象属性'
                        }
                    }
                }
            }
        })
    }
    update()
    const dispos = xbsjEarthUi.activeViewerChanged.disposableOnce(update)
    onBeforeUnmount(() => {
        dispos()
        destroyClick()
        if (sceneobject) {
            sceneobject.resetFeatureStyle()
        }
    })
})
const changeMousePick = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    xbsjEarthUi.roamMode = 'Map'
    mousePick.value = !mousePick.value
    if (!mousePick.value) {
        if (sceneobject) {
            sceneobject.resetFeatureStyle()
        }
    }
}
const ok = (rgba: [number, number, number, number]) => {
    checkedColor.value = rgba
}
const changePropertyIsShow = () => {
    propertyIsShow.value = !propertyIsShow.value
    if (propertyIsShow.value) {
        xbsjEarthUi.pickResult = undefined
    }
}
</script>

<template>
    <RightList :title="'鼠标拾取'">
        <Button :name="'shubiaoshiqu'" :content="'鼠标拾取'" :click="changeMousePick" :actived="mousePick"
            :left-button="true"></Button>
        <Picking v-if="mousePick" @ok="ok" :checkedColor="checkedColor" :propertyIsShow=propertyIsShow
            @changeProp="changePropertyIsShow"></Picking>
    </RightList>
</template>
