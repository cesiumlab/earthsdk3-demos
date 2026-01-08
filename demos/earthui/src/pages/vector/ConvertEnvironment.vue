<template>
  <div class="convert-content">
    <div class="close">
      <span @click="close">x</span>
    </div>
    <div class="change">
      <!-- <span @click="searchContent = '${czm-path}'">czm-path</span> -->
      <span @click="czmPathClick('${czm-path}')">czm-path</span>
      <span @click="czmPathClick('${czmlab-path}')">czmlab-path</span>
      <span @click="czmPathClick('${scene-manager-script-dir}')">scene-manager-script-dir</span>
    </div>
    <div class="input-div">
      <div>
        <input
          type="text"
          placeholder="请输入您要查询的环境变量..."
          v-model="searchContent"
          @change="search"
          ref="searchInput"
        />
        <span class="button-span" @click="searchContent = ''">清空</span>
      </div>
      <div>
        <input type="text" v-model="transformContent" readonly />
        <span class="button-span" @click="copy">复制</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { copyClipboard } from '../../components/eSPropPanel/propertiesMenu/commons/base/copyClipboard'
import { ref, watch } from 'vue'
import { ESSceneObject } from 'earthsdk3'
const searchContent = ref(
  '${scene-manager-script-dir}/xe2-assets/scene-manager/images/location.png'
)
const transformContent = ref('')
const emits = defineEmits(['close'])
const searchInput = ref<HTMLElement>()

const search = () => {
  transformContent.value = ESSceneObject.context.getStrFromEnv(searchContent.value)
}
watch(
  searchContent,
  (val) => {
    transformContent.value = ESSceneObject.context.getStrFromEnv(val)
  },
  { immediate: true }
)
const copy = () => {
  copyClipboard(transformContent.value)
}
const close = () => {
  emits('close')
}
const czmPathClick = (type: string) => {
  //@ts-ignore
  searchContent.value =
    searchContent.value.slice(0, searchInput.value.selectionStart) +
    type +
    searchContent.value.slice(searchInput.value.selectionEnd)
}
</script>
<style scoped>
.convert-content {
  width: 600px;
  height: 200px;
  color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(37, 38, 42, 1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 5000;
}

.close {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
  font-size: 20px;
  cursor: pointer;
}

.change {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
  font-size: 20px;
}

.change > span {
  height: 26px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid rgba(28, 28, 29, 0.6);
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  margin-right: 20px;
  margin-top: 10px;
  font-size: 14px;
  line-height: 26px;
  padding: 0 10px;
}

.change > span:hover {
  border: 1px solid #2c68f7;
}

.input-div {
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: space-evenly;
  padding: 0 20px;
  box-sizing: border-box;
}

.input-div > div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.input-div > div > input {
  flex: 1;
  height: 26px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid #3b3c40;
  color: rgba(230, 230, 230, 1);
  padding-left: 11px;
  box-sizing: border-box;
}

.input-div > div > input:hover {
  border: 1px solid #2c68f7;
}

.input-div > div > input:focus {
  border: 1px solid #2c68f7;
}

.button-span {
  display: inline-block;
  height: 26px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid rgba(28, 28, 29, 0.6);
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  margin-left: 20px;
  font-size: 14px;
  line-height: 26px;
  padding: 0 10px;
}

.button-span:hover {
  border: 1px solid #2c68f7;
}
</style>
