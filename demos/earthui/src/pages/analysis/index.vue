<script setup lang='ts'>
import { ref } from "vue";
import Measure from './Measure.vue';
import Plane from './Plane.vue';
import SpatialAnalysis from './SpatialAnalysis.vue';
import SpatialAnalysis2 from './SpatialAnalysis2.vue';
import Interpolation from './Interpolation.vue';
const closeSceneobject = ref(0)
const closeObj = () => {
    closeSceneobject.value++
}
</script>

<template>
    <!-- 分析 -->
    <div class="roam">
        <Measure @closeObj="closeObj"></Measure>
        <Plane @closeObj="closeObj"></Plane>
        <SpatialAnalysis :closeSceneobject="closeSceneobject"></SpatialAnalysis>
        <SpatialAnalysis2 :closeSceneobject="closeSceneobject"></SpatialAnalysis2>
        <Interpolation @closeObj="closeObj"></Interpolation>
    </div>
</template>
<style src="../../css/AnalysisObj.css"></style>
