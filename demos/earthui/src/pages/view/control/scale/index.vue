<template>
    <div class="scale" ref="scaleRef">
        <div class="scale_border">{{ lengthInPixel }}</div>
        <div class="scale_length"></div>
    </div>
</template>
<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { inject, useTemplateRef } from "vue";
import { useScale } from './useScale';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const scaleRef = useTemplateRef('scaleRef')

// 使用比例尺hook
const { lengthInPixel } = useScale(xbsjEarthUi, scaleRef);
</script>
<style scoped>
.scale {
    position: fixed;
    cursor: pointer;
    width: 125px;
    height: 30px;
    bottom: 50px;
    right: calc(var(--right-sidebar-width) + 10px);
    transition: right 0.4s linear;
    border: 1px solid rgba(49, 50, 56, .8);
    background: rgba(37, 38, 42, .8);
    pointer-events: none;
    border-radius: 15px;
    padding: 0 5px;
}

.scale_border {
    width: 125px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: lighter;
    line-height: 30px;
    color: #fff;
}

.scale_length {
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    position: absolute;
    height: 10px;
    top: 15px;
    left: 17.5px;
    width: 100px;
}
</style>
