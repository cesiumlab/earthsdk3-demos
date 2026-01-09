<template>
  <RightList :title="'数据源'" :isTop="true">
    <Button
      :name="'zaixian'"
      :content="'在线'"
      :click="
        () => {
          modellistShow = !modellistShow
        }
      "
      :actived="modellistShow"
      :left-button="true"
    ></Button>
    <Button
      :name="'hebingshujuji'"
      :content="'合并'"
      :click="
        () => {
          mergeModelShow = !mergeModelShow
        }
      "
      :actived="mergeModelShow"
      :left-button="false"
    ></Button>
    <ModelChange v-if="modellistShow" @close="modellistShow = false"></ModelChange>
    <MergeModels v-if="mergeModelShow" @close="mergeModelShow = false"></MergeModels>
  </RightList>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModelChange from './modeldatasource/ModelChange.vue'
import MergeModels from './modeldatasource/MergeModels.vue'
import RightList from '../../components/RightList.vue'
import Button from '../../components/Button.vue'
const modellistShow = ref(false)
const mergeModelShow = ref(false)
</script>
