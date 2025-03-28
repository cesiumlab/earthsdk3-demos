<template>
    <PopList :title="'定位配置'">
        <LabelInput :inputType="'number'" v-model="flyToBoundingSize" :label="'定位配置'" >
        </LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const flyToBoundingSize = toVR<number>(d, [xbsjEarthUi.activeViewer, 'flyToBoundingSize']);//定位配置

</script>