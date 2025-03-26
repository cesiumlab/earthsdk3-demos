<template>
  <span class="Undefined_settting" @click.stop="playingRef = !playingRef" :title="playingRef ? '暂停' : '播放'">{{
    playingRef ? '〓' : '▼'
  }}</span>
  <span class="Undefined_settting player_stop" title='停止' @click="playingRef = false, ratioRef = 0">■</span>
  <!-- 让超出div范围的拖拽起作用 vtxf 20220719 -->
  <div class="prop_edit"
    @pointerdown="($event.target && ($event.target as Element).setPointerCapture($event.pointerId), toRatioBarDown($event))"
    @pointermove="toRatioBar($event)" id="slider"
    @pointerup="($event.target && ($event.target as Element).setPointerCapture($event.pointerId), toRatioBarUp($event))">
    <div class="progress_bar" :style="{ width: (ratioRef * 100) + '%' }"></div>
  </div>

  <img class="loop" :src="!loopReact ? loopUrl.loopTrue : loopUrl.loopFalse" title="是否循环"
    @click="loopReact = !loopReact">
</template>

<script setup lang="ts">
import { PlayerProperty } from "earthsdk3";
import { createVueDisposer, toVueRefWithoutUndefined } from "../../../tools";
import { onBeforeUnmount, ref } from "vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
  property: any
}>(), {
})
const emits = defineEmits<{
  (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const loopUrl = {
  loopTrue: require('../../../img/loop.png'),
  loopFalse: require('../../../img/loop_true.png')
}

const { property } = props
const disposer = createVueDisposer(onBeforeUnmount)
const ratioRef = toVueRefWithoutUndefined<number>(disposer, property.ratioReact, property.defaults.ratio)
const playingRef = toVueRefWithoutUndefined<boolean>(disposer, property.playingReact, property.defaults.playing)
const loopReact = toVueRefWithoutUndefined<boolean>(disposer, property.loopReact, property.defaults.loop)
const flagMove = ref(false)

const toRatioBar = (e: MouseEvent) => {
  if (!flagMove.value) {
    return
  }
  ratioRef.value = e.offsetX / 120
}
const toRatioBarDown = (e: MouseEvent) => {
  flagMove.value = true
}
const toRatioBarUp = (e: MouseEvent) => {
  ratioRef.value = e.offsetX / 120
  flagMove.value = false
}

</script>

<style scoped>
.prop_edit {
  width: 120px;
  background: #383838;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}

.progress_bar {
  background-color: #49ec12;
  height: 7px;
  border-radius: 3px;
}

.Undefined_settting {
  cursor: pointer;
  transform: rotate(-90deg);
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  margin-right: 10px;
  border-radius: 3px;
  background-color: #383838;
  display: inline-block;
}

.Undefined_settting:hover {
  background-color: #242424;
}



.readonly_flag {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.loop {
  width: 16px;
  height: 16px;
  margin: 0 10px;
}

.player_stop {
  line-height: 15px;
  font-size: 20px;
}
</style>
