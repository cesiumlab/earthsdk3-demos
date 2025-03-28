<script setup lang='ts'>
import { inject,onBeforeUnmount } from "vue";
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import Vports from "./splitView/Vports.vue";
import { XbsjEarthUi } from '../../scripts/xbsjEarthUi';
import { createVueDisposer, toVR } from 'earthsdk-ui';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const animationShow = toVR<boolean>(d, [xbsjEarthUi, "animationShow"])//播放器的开始时间

</script>
<template>
    <RightList :title="'动画'">
        <Button :name="'donghua'" :content="'动画'"
            :click="() => { animationShow = !animationShow }"
            :actived="animationShow" :left-button="true"></Button>
    </RightList>
</template>
