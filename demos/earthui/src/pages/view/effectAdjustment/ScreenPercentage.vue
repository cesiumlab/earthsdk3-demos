<template>
    <PopList :title="'画面比例'">
        <LabelInputSliderReset v-model="screenPercentage" :label="'画面比例'" :step="1" :min="50" :max="250"
            :defaultValue="50" :width="154">
        </LabelInputSliderReset>
    </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import LabelInputSliderReset from "../../../components/LabelInputSliderReset.vue";
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const screenPercentage = toVR<number>(d, [xbsjEarthUi.activeViewer, 'screenPercentage']);//画面比例

</script>