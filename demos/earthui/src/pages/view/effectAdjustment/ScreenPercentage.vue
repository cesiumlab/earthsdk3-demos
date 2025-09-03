<template>
    <PopList :title="'画面比例'">
        <LabelInputDefault v-model="screenPercentage" :inputType="'number'" :min="0" :max="300" :label="'画面比例'" :unit="'%'"></LabelInputDefault>
    </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import LabelInputDefault from "../../../components/LabelInputDefault.vue"

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const screenPercentage = toVR<number>(d, [xbsjEarthUi.activeViewer, 'screenPercentage']);//画面比例

</script>