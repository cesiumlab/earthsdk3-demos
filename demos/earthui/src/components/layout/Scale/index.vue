<template>
  <div class="scale" ref="scaleRef">
    <div class="scale_border">{{ lengthInPixel }}</div>
    <div class="scale_length" :style="{ width: scaleWidth + 'px' }"></div>
  </div>
</template>
<script setup lang="ts">
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { inject, useTemplateRef } from 'vue'
import { useScale } from './useScale'

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const scaleRef = useTemplateRef('scaleRef')

// 使用比例尺hook，获取显示文本和线段宽度
const { lengthInPixel, scaleWidth } = useScale(xbsjEarthUi, scaleRef)
</script>
<style scoped>
.scale {
  position: fixed;
  cursor: pointer;
  width: 125px;
  height: 30px;
  bottom: 50px;
  right: 410px;
  transition: right 0.4s linear;
  pointer-events: none;
  border-radius: 15px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  border: 1px solid #fff;
  border-top: none;
  position: absolute;
  height: 10px;
  top: 15px;
  /* 动态宽度，通过style绑定 */
  transition: width 0.3s ease;
}
</style>
