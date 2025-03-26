<script setup lang='ts'>
import { ref } from 'vue';
import VolumeMeasurement from './interpolation/VolumeMeasurement.vue'; //体积组件
import SurfaceAreaMeasurement from './interpolation/SurfaceAreaMeasurement.vue'; //表面积组件
import SunshineAnalysis from './interpolation/SunshineAnalysis.vue'; //表面积组件
import SectionalAnalysis from './interpolation/SectionalAnalysis.vue'; //断面组件

import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
const controlList: { type: string, zh: string, icon: string, leftButton: boolean }[] = [
    {
        type: 'volume',
        zh: '体积测量',
        icon: 'tiji',
        leftButton: true
    },
    {
        type: 'surfaceAreaMeasurement',
        zh: '表面积',
        icon: 'biaomianji',
        leftButton: false
    },
    {
        type: 'sunshineAnalysis',
        zh: '日照分析',
        icon: 'rizhaofenxi',
        leftButton: true
    },
    {
        type: 'sectionalAnalysis',
        zh: '断面分析',
        icon: 'rizhaofenxi',
        leftButton: false
    }
];
const objType = ref('')
const changeObjType = (type: string) => {
    emits('closeObj')
    setTimeout(() => {
        if (objType.value === type) {
            objType.value = ''
        } else {
            objType.value = type
        }
    }, 50)

}
const emits = defineEmits(['closeObj'])
</script>

<template>
    <RightList :title="'插值计算'">
        <Button v-for="item in controlList" :name="item.icon" :content="item.zh"
            :click="() => { changeObjType(item.type) }" :actived="objType === item.type"
            :left-button="item.leftButton"></Button>
        <VolumeMeasurement v-if="objType === 'volume'" @close="objType = ''">

        </VolumeMeasurement>
        <SurfaceAreaMeasurement v-if="objType === 'surfaceAreaMeasurement'" @close="objType = ''">
        </SurfaceAreaMeasurement>
        <SunshineAnalysis v-if="objType === 'sunshineAnalysis'" @close="objType = ''">
        </SunshineAnalysis>
        <SectionalAnalysis v-if="objType === 'sectionalAnalysis'" @close="objType = ''">
        </SectionalAnalysis>
    </RightList>
</template>
