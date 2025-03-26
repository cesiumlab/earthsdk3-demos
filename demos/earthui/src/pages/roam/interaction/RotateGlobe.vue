<template>
    <PopList :title="'环绕地球'">
        <LabelInput v-model="latitude" :inputType="'number'" :label="'纬度'" :unit="'°'" :max="90" :min="-90">
        </LabelInput>
        <LabelInput v-model="height" :inputType="'number'" :label="'高度'" :unit="'m'"></LabelInput>
        <LabelInput v-model="surroundingPeriod" :inputType="'number'" :label="'周期'" :unit="'s'" :noZero="true">
        </LabelInput>
    </PopList>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from '../../../components/PopList.vue';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close', 'ok'])
const latitude = ref<number>(38)//纬度0-90
const height = ref<number>(10000000)//高度200000-280430000
const surroundingPeriod = ref<number>(60)//环绕周期1-600
watch([latitude, height, surroundingPeriod], () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToRotateGlobe(latitude.value, height.value, surroundingPeriod.value)
})
onMounted(() => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToRotateGlobe(latitude.value, height.value, surroundingPeriod.value)
    xbsjEarthUi.roamMode = 'RotateGlobe'
})
</script>
