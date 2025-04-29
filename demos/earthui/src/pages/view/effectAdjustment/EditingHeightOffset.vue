<template>
    <PopList :title="'编辑高度偏移'">
        <LabelInput :inputType="'number'" v-model="editingHeightOffset" :label="'编辑高度偏移'">
        </LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { createVueDisposer, toVR } from "earthsdk-ui";

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const editingHeightOffset = toVR<number>(d, [xbsjEarthUi.activeViewer, 'editingHeightOffset']);// 编辑高度偏移
</script>