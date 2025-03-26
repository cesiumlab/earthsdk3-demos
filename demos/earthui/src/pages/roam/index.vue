<script setup lang='ts'>
import CameraViews from './CameraViews.vue';
import Interaction from './Interaction.vue';
import CousePicking from './CousePicking.vue';
import Search from './Search.vue';
</script>
<template>
    <!-- 漫游 -->
    <div class="roam">
        <CameraViews></CameraViews>
        <Interaction></Interaction>
        <CousePicking></CousePicking>
    </div>
</template>
<style src="../../css/RoamObj.css"></style>
