<template>
  <span class="Undefined_settting" @click.stop="playingRef = !playingRef" :title="playingRef ? '暂停' : '播放'">{{
    playingRef ? '〓' : '▼'
  }}</span>
  <span class="Undefined_settting player_stop" title='停止' @click="property.stopFn()">■</span>

  <img class="loop" :src="!loopReact ? loopUrl.loopTrue : loopUrl.loopFalse" title="是否循环"
    @click="loopReact = !loopReact">
</template>

<script setup lang="ts">
import { ViewPlayerProperty } from "earthsdk3";
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
const playingRef = toVueRefWithoutUndefined<boolean>(disposer, property.playingReact, property.defaults.playing)
const loopReact = toVueRefWithoutUndefined<boolean>(disposer, property.loopReact, property.defaults.loop)

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
