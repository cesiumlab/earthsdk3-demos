<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../components/Button.vue'
import RightList from '../../components/RightList.vue'
import Vports from './splitView/Vports.vue'
const vportsIsShow = ref(false)
</script>
<template>
  <RightList :title="'分屏'">
    <Button
      :name="'dixingtiaoshi'"
      :content="'视口'"
      :click="
        () => {
          vportsIsShow = !vportsIsShow
        }
      "
      :actived="vportsIsShow"
      :left-button="true"
    ></Button>
    <Vports v-if="vportsIsShow"></Vports>
  </RightList>
</template>
