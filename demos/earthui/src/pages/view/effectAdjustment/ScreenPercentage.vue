<template>
    <PopList :title="'画面比例'">
        <LabelInput v-model="screenPercentage" :inputType="'number'" :label="'画面比例'" :unit="'%'"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import LabelInput from "../../../components/LabelInput.vue"

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const screenPercentage = toVR<number>(d, [xbsjEarthUi.activeViewer, 'screenPercentage']);//画面比例

</script>