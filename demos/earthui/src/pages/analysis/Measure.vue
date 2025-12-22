<script setup lang='ts'>
import { onBeforeUnmount, inject } from 'vue';
import { createVueDisposer, toReadonlyVueRef } from 'earthsdk-ui';
import {  messageBox } from "earthsdk-ui"
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import { ElMessage } from 'element-plus';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { measurementManager } = xbsjEarthUi;
const d = createVueDisposer(onBeforeUnmount);
const currentEditingType = toReadonlyVueRef<string>(d, [measurementManager, 'currentEditingType']);
type MeasureTypeParam = 'ESLocationMeasurement' | 'ESDistanceMeasurement' | 'ESAreaMeasurement' | 'ESHeightMeasurement' | 'ESSurfaceAreaMeasurement' | 'ESDirectionMeasurement'
const controlList: { type: MeasureTypeParam, zh: string, icon: string, leftButton: boolean }[] = [
    {
        type: 'ESLocationMeasurement',
        zh: '点位',
        icon: 'dianwei',
        leftButton: true

    },
    {
        type: 'ESDirectionMeasurement',
        zh: '方位角',
        icon: 'fangweijiao',
        leftButton: false

    },
    {
        type: 'ESDistanceMeasurement',
        zh: '距离',
        icon: 'juli',
        leftButton: true
    },
    {
        type: 'ESHeightMeasurement',
        zh: '高度',
        icon: 'gaodu',
        leftButton: false
    },
    {
        type: 'ESAreaMeasurement',
        zh: '面积',
        icon: 'mianji',
        leftButton: true
    }
];
const confirm = () => {
    measurementManager.clearAll()
    ElMessage.success('删除成功')
}
const emits = defineEmits(['closeObj'])
const changeConfirmdelete = () => {
    emits('closeObj')
    setTimeout(() => {
        if (measurementManager.objectlist.length > 0) {
            messageBox({ text: '确认删除全部测量？' })
                .then(() => {
                    confirm()
                })
                .catch((err) => {
                })
        } else {
            ElMessage.warning('暂无测量，无法删除')
            return
        }
    }, 50)


}
const create = (type: MeasureTypeParam) => {
    emits('closeObj');
    setTimeout(() => {
        measurementManager.create(type)
    }, 50)
}
onBeforeUnmount(() => {
    measurementManager.stopEditing()
})
</script>

<template>
    <RightList :title="'测量'" :isTop="true">
        <Button v-for="item in controlList" :name="item.icon" :content="item.zh" :click="() => create(item.type)"
            :actived="currentEditingType === item.type" :left-button="item.leftButton"></Button>
        <Button :name="'shanchu'" :content="'全部删除'" :click="changeConfirmdelete" :left-button="false"></Button>
    </RightList>
</template>
