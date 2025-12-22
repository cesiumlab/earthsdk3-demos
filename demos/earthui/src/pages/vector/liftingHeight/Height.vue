<template>
    <PopList :title="'抬升对象'" :showButton="true" @ok="ok">
        <div class="roam_moveOnLineMode">
            <div>
                <label for="">{{ obj.point }}个点:</label>
                <div class="check_box" @click.stop="pointIsChecked = !pointIsChecked">
                    <es-icon :name="pointIsChecked ? 'checked' : 'unchecked'"
                        :color="pointIsChecked ? '#fff' : '#3b3c40'" :size="22" />
                </div>
            </div>
            <div>
                <label for="">{{ obj.line }}条线:</label>
                <div class="check_box" @click.stop="lineIsChecked = !lineIsChecked">
                    <es-icon :name="lineIsChecked ? 'checked' : 'unchecked'" :color="lineIsChecked ? '#fff' : '#3b3c40'"
                        :size="22" />
                </div>
            </div>
            <div>
                <label for="">{{ obj.polygon }}个面:</label>
                <div class="check_box" @click.stop="polygonIsChecked = !polygonIsChecked">
                    <es-icon :name="polygonIsChecked ? 'checked' : 'unchecked'"
                        :color="polygonIsChecked ? '#fff' : '#3b3c40'" :size="22" />
                </div>
            </div>
        </div>
        <LabelInput v-model="height" :inputType="'number'" :label="'抬升高度'"></LabelInput>
    </PopList>
</template>
<script setup lang='ts'>
import PopList from '../../../components/PopList.vue';
import { ref, inject, onMounted, onBeforeUnmount } from "vue"
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { SceneTree } from 'earthsdk3';
import { ElMessage } from 'element-plus'
import LabelInput from "../../../components/LabelInput.vue"

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
import { searchGroupPLP, pointHeight, lineHeight, polygonHeight } from "./tools"
const pointIsChecked = ref(false)
const lineIsChecked = ref(false)
const polygonIsChecked = ref(false)
const obj = ref({
    point: 0,
    line: 0,
    polygon: 0
})
const height = ref()
const emits = defineEmits(['close'])
const ok = () => {
    if (!height.value) {
        ElMessage.warning('请输入抬升高度')
        return
    }
    if (!pointIsChecked.value && !lineIsChecked.value && !polygonIsChecked.value) {
        ElMessage.warning('请选择至少一个选项进行操作')
        return
    }
    if (pointIsChecked.value && obj.value.point > 0) {
        pointLiftingHeight()
    }
    if (lineIsChecked.value && obj.value.line > 0) {
        lineLiftingHeight()
    }
    if (polygonIsChecked.value && obj.value.polygon > 0) {
        ploygonLiftingHeight()
    }
    ElMessage.success('高度抬高成功')
    emits('close')
}
const pointLiftingHeight = () => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem) {
        pointHeight(xbsjEarthUi, lastSelectedItem.json, height.value)
    }
}
const lineLiftingHeight = () => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem) {
        lineHeight(xbsjEarthUi, lastSelectedItem.json, height.value)
    }

}
const ploygonLiftingHeight = () => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem) {
        polygonHeight(xbsjEarthUi, lastSelectedItem.json, height.value)
    }
}
const update = () => {
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (lastSelectedItem) {
        obj.value = searchGroupPLP(xbsjEarthUi, lastSelectedItem.json)
    } else {
        obj.value = {
            point: 0,
            line: 0,
            polygon: 0
        }
    }
}
onMounted(() => {
    update()
    let dispose = sceneTree.selectedItems.changedEvent.disposableOn(update)
    onBeforeUnmount(() => {
        if (dispose) dispose()
    })
})
</script>