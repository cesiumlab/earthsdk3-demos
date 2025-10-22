<script setup lang='ts'>
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { inject, onBeforeUnmount } from 'vue';
import Navigator from './navigator/index.vue';
import StatusBar from './status-bar/index.vue';
import Scale from './scale/index.vue';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi;

const disposer = createVueDisposer(onBeforeUnmount);
const navigatorShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "navigatorShow"]);
const scaleShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "scaleShow"]);
const statusBarShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "statusBarShow"]);

</script>

<template>
    <!-- 状态栏-->
    <StatusBar v-if="statusBarShow"></StatusBar>
    <!-- 状态栏-->
    <Navigator v-if="navigatorShow"></Navigator>
    <!-- 比例尺-->
    <Scale v-if="scaleShow"></Scale>
</template>

<style scoped></style>
