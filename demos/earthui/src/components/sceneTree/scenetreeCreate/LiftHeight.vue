<template>
    <Window :title="`${liftHeightName}--抬升高度编辑`" :show="props.isShow" @cancel="changeCancel" @ok="changeOk" :width="500"
        :height="200">
        <div class="lift_height">
            <LabelInput :label="'抬升高度'" v-model="height" :unit="'m'" :inputType="'number'"></LabelInput>
            <div v-if="liftHeightType === 'blank' || liftHeightType === 'folder'" class="blank_lift_sceneObj">当前的抬升对象有{{
        blankLiftSceneObj
    }}个，符合抬升的对象有{{ rightLiftSceneObj }}个</div>
        </div>

    </Window>
</template>

<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { SceneTreeItem } from "earthsdk3";
import { inject, onBeforeUnmount, ref, watch } from "vue";
import Window from "../../../components/commom/Window.vue";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import LabelInput from "../../LabelInput.vue";
import { ESGeoVector, ESObjectWithLocation } from 'earthsdk3';
import { searchCheckedFromFolders, searchCheckedTreeItems, searchSceneObjectFromFolders, searchSceneObjectTreeItems } from "../tools";
import { ElMessage } from 'element-plus';
const emits = defineEmits(["changeShow"]);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

const props = withDefaults(defineProps<{
    isShow: boolean,
    liftHeightTreeItem: SceneTreeItem | undefined,
    liftHeightType: string,
    liftHeightName: string
}>(), {});
const height = ref(10)
const blankLiftSceneObj = ref(0)
const rightLiftSceneObj = ref(0)
const checkLiftSceneObj = ref<any[]>([])
const disposer = createVueDisposer(onBeforeUnmount);

const sceneTreeCheckedIcon = toVR<boolean>(disposer, [xbsjEarthUi, "sceneTreeCheckedIcon"])

const changeOk = () => {
    filterCheckedSceneObj()
}
const changeCancel = () => {
    emits('changeShow')
}
const scenetree = ref()

watch(() => props.liftHeightTreeItem, () => {
    scenetree.value = props.liftHeightTreeItem
}, { immediate: true })

const sceneObjectLiftHeight = (sceneObject: any) => {//对象抬升高度
    if (sceneObject instanceof ESObjectWithLocation) {
        const sceneHeight = sceneObject.position[2]
        const newHeight = height.value + sceneHeight
        const position = [sceneObject.position[0], sceneObject.position[1], newHeight] as [number, number, number]
        sceneObject.position = position
    } else if (sceneObject instanceof ESGeoVector) {
        const points = sceneObject.points
        const newPoints: any = []
        if (points && points.length > 0) {
            points.forEach(item => {
                const point2 = item[2] + height.value
                const p = [item[0], item[1], point2]
                newPoints.push(p)
            })
        }
        sceneObject.points = newPoints
    }
}
const filterCheckedSceneObj = () => {
    if (scenetree.value && props.liftHeightType === 'node') {//节点右键
        const sceneObject = scenetree.value.sceneObject
        sceneObjectLiftHeight(sceneObject)
        ElMessage.success(`抬升${height.value}m高度成功`)
    } else if (props.liftHeightType === 'blank' || props.liftHeightType === 'folder') {//空白右键||文件夹右键
        if (rightLiftSceneObj.value === 0) {
            ElMessage.warning('当前符合抬升的对象个数为0，请重新选择')
            return
        }
        if (checkLiftSceneObj.value.length > 0) {
            checkLiftSceneObj.value.forEach((item: SceneTreeItem) => {
                sceneObjectLiftHeight(item)
            });
        }
        ElMessage.success(`抬升${height.value}m高度成功`)
    }
}
watch(() => props.isShow, () => {
    if (props.isShow) {
        if (props.liftHeightType === 'blank') {
            if (sceneTreeCheckedIcon.value) {
                checkLiftSceneObj.value = searchCheckedTreeItems(xbsjEarthUi)
            } else {
                checkLiftSceneObj.value = searchSceneObjectTreeItems(xbsjEarthUi)
            }
        } else if (props.liftHeightType === 'folder') {
            if (sceneTreeCheckedIcon.value) {
                checkLiftSceneObj.value = searchCheckedFromFolders(scenetree.value)
            } else {
                checkLiftSceneObj.value = searchSceneObjectFromFolders(scenetree.value)
            }
        }
        blankLiftSceneObj.value = checkLiftSceneObj.value.length
        let a = 0
        if (checkLiftSceneObj.value.length > 0) {
            checkLiftSceneObj.value.forEach((item: SceneTreeItem) => {
                if (item instanceof ESObjectWithLocation || item instanceof ESGeoVector) {
                    a++
                }
            });
        }
        rightLiftSceneObj.value = a
    }
    height.value = 10
})
</script>
<style scoped>
.lift_height {
    padding: 0 15px;
    box-sizing: border-box;
}

.blank_lift_sceneObj {
    width: 100%;
    height: 26px;
    font-size: 12px;
    margin-top: 10px;
    color: rgba(230, 230, 230, 1);
}
</style>