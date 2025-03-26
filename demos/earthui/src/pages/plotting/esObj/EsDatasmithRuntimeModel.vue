<template>
    <PopList :title="'Datasmath'" :showButton="true" @close="cancel" @ok="ok">
        <LabelInput v-model="url" :label="'路径'"></LabelInput>
        <LabelInput v-model="position[0]" :inputType="'number'" :label="'经度'" :max="180" :min="-180" :placeholder="'请输入经度或者点击地球获取'">
        </LabelInput>
        <LabelInput v-model="position[1]" :inputType="'number'" :label="'纬度'" :max="90" :min="-90" :placeholder="'请输入纬度或者点击地球获取'">
        </LabelInput>
        <LabelInput v-model="position[2]" :inputType="'number'" :label="'高度'" :placeholder="'请输入高度或者点击地球获取'">
        </LabelInput>
        <div style="width: 100%;font-size: 12px;color: rgba(230, 230, 230, 1);margin-top: 10px">
            <label for="" style="width: 60px;display: inline-block;">样式</label><span style="cursor: pointer;"
                @click="windowShow = true">⚙</span>
        </div>
    </PopList>
    <JsonStringProps :jsonStr="''" :isShow="windowShow" @changeShow="windowShow = false" @getJsonStr="setJson">
    </JsonStringProps>
</template>
<script setup lang='ts'>
import PopList from '../../../components/PopList.vue';
import { ref, inject, onMounted, onBeforeUnmount } from "vue"
import { ueActorResult } from './fun';
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
import { Message } from 'earthsdk-ui';
import { ESDatasmithRuntimeModel } from 'earthsdk3';
import LabelInput from "../../../components/LabelInput.vue";
import JsonStringProps from "../../vector/JsonStringProps.vue"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const url = ref()
const position = ref([undefined, undefined, undefined])
const emits = defineEmits(['close'])
const pos = (messages: { [key: string]: any }) => {
    const a = messages.pickResult.position
    const pos = a.map((num: number) => Number(num.toFixed(7)))
    if (pos) {
        position.value = pos
    }
}
const windowShow = ref(false)
const importOptions = ref('')
const setJson = (str: string) => {
    if (str) {
        importOptions.value = str
    }

}
//调用点击返回拾取信息函数
const dispose = ueActorResult(xbsjEarthUi, pos)
const destroy = () => {//销毁
    if (dispose) dispose()
}
const ok = () => {
    if (!url.value) {
        Message.warning('请填写路径')
        return
    }
    if (!position.value) {
        Message.warning('请填写经纬度')
        return
    }
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    if (viewer.typeName !== 'ESUeViewer') {
        Message.warning('请在ue视口下操作')
        return
    }
    const sceneTree = xbsjEarthUi.getSceneTree()
    if (!sceneTree) return
    let treeItem: any
    const lastSceneTreeItem = sceneTree.lastSelectedItem
    if (!lastSceneTreeItem) {
        treeItem = sceneTree.createSceneObjectTreeItem(ESDatasmithRuntimeModel)
    } else {
        if (lastSceneTreeItem.type === 'Folder') {
            treeItem = sceneTree.createSceneObjectTreeItem(ESDatasmithRuntimeModel, undefined, lastSceneTreeItem, 'Inner')
        } else {
            treeItem = sceneTree.createSceneObjectTreeItem(ESDatasmithRuntimeModel, undefined, lastSceneTreeItem, 'After')
        }
    }
    sceneTree.uiTree.clearAllSelectedItems()
    treeItem.uiTreeObject.selected = true
    const sceneObject = treeItem.sceneObject
    xbsjEarthUi.propSceneTree = treeItem
    if (!sceneObject) return
    sceneObject.url = url.value
    sceneObject.position = position.value
    const sceneObjectIndex = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESDatasmithRuntimeModel')
    sceneObject.name = 'ESDatasmith' + (sceneObjectIndex + 1)
    sceneObject.importOptions = importOptions.value
    emits('close')
    destroy()
}
const cancel = () => {
    emits('close')
    destroy()
}
onMounted(() => {
    Message.warning('可以通过点击地球获取经纬度点')
})
onBeforeUnmount(() => destroy())

</script>