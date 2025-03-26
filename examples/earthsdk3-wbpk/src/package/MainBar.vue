<script setup lang='ts'>
import SceneCreatingToolbar from '../components/common/SceneCreatingToolbar.vue'

</script>

<template>

    <div class="tool_panels">
        <div class="title">ESObj Editor</div>
        <SceneCreatingToolbar></SceneCreatingToolbar>
    </div>

</template>

<style scoped>
.tool_panels {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0px;
    top: 0px;
    display: flex;
    background-color: #0e2931;
    color: #fff;
    justify-content: flex-start;
    align-items: center;
}

.title {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: 700;
    cursor: pointer;
}
</style>
