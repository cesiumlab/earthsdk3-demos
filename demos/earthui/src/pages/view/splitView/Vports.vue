<template>
  <PopList :title="'多视口'">
    <div @click="one">单视口</div>
    <div @click="two">双视口</div>
  </PopList>
</template>
<script setup lang="ts">
import { inject, onBeforeUnmount, ref } from 'vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createVueDisposer, toVR } from 'earthsdk-ui'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const one = () => {
  console.log('one')
}
const two = () => {
  console.log('two')
}
</script>
