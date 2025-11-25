<script setup lang='ts'>
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { $config } from "@/global";
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import Animation from "./Animation.vue";
import Control from "./Control.vue";
import Debug from "./Debug.vue";
import EffectAdjustment from './EffectAdjustment.vue';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const activeViewerType = toVR<string>(d, [xbsjEarthUi, 'activeViewerType'])

const largeScreen = ref(true)
onMounted(() => {
    //@ts-ignore
    if (window.ue && window.ue.es) {
        largeScreen.value = false
    }
})
</script>
<template>
    <!-- 视图 -->
    <div class="roam">
        <Control></Control>
        <Debug v-if="activeViewerType !== 'ESUeViewer' && largeScreen && $config.modelShow"></Debug>
        <Animation></Animation>
        <EffectAdjustment></EffectAdjustment>
    </div>
</template>
