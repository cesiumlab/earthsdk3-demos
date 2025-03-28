<script setup lang='ts'>
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { ref } from 'vue';
import TerrainBall from './terraindatasourse/TerrainBall.vue';
import TerrainChange from './terraindatasourse/TerrainChange.vue';
import TerrainlabChangeVue from './terraindatasourse/TerrainlabChange.vue';
const imagelistShow = ref(false)
const lablistShow = ref(false)
const ballIsSgow = ref(false)
</script>

<template>
    <RightList :title="'数据源'" :isTop="true">
        <Button :name="'zaixian'" :content="'在线'"
            :click="() => { imagelistShow = !imagelistShow; lablistShow = false; ballIsSgow = false }"
            :actived="imagelistShow" :left-button="true"></Button>
        <Button :name="'pingqiudixing'" :content="'平球地形'"
            :click="() => { ballIsSgow = !ballIsSgow; imagelistShow = false; lablistShow = false }"
            :actived="ballIsSgow"></Button>
        <TerrainChange v-if="imagelistShow"></TerrainChange>
        <TerrainBall v-if="ballIsSgow"></TerrainBall>
    </RightList>
</template>
