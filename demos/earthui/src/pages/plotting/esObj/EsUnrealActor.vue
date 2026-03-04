<template>
  <!-- 创建 -->
  <PopList :title="'创建场景对象'" :showButton="true" @ok="ok">
    <LabelInput v-model="actorclass" :label="'引用路径'"></LabelInput>
    <LabelInput v-model="name" :label="'名称'"></LabelInput>
  </PopList>
</template>

<script setup lang="ts">

import { ElMessage } from 'element-plus'
import { ESUnrealActor } from 'earthsdk3'
import { inject, onBeforeUnmount, ref } from 'vue'
import LabelInput from '../../../components/LabelInput.vue'
import PopList from '../../../components/PopList.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { createSceneObjTreeItemFromJson } from './fun'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close'])
const ok = () => {
  if (!actorclass.value) {
    ElMessage.warning('请填写引用路径')
    return
  }
  const obj = xbsjEarthUi.createSceneObject(ESUnrealActor)

  if (obj) {
    obj.lastActorStatusChanged.don((res) => {
      if (res === 'created') {
        obj.editing = true
      }
    })
    obj.name = name.value || actorclass.value.slice(actorclass.value.lastIndexOf('.') + 1, -1)
    obj.actorClass = actorclass.value

    //编辑状态结束后根据json创建在场景树上
    obj.d(
      obj.editingChanged.disposableWeakOn(() => {
        if (obj && obj.editing === false) {

          const json = obj.json
          const position = obj.position
          const a = position[0] === 0 && position[1] === 0
          xbsjEarthUi.destroySceneObject(obj)
          setTimeout(() => {
            if (!a) {
              createSceneObjTreeItemFromJson(xbsjEarthUi, json)
            }
          }, 100)
        }
      })
    )
  }
  emits('close')
  return
}
const actorclass = ref()
const name = ref()
onBeforeUnmount(() => {

})
</script>
