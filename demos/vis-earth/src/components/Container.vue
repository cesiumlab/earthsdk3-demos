<script setup lang='ts'>
import { nextTick, ref } from 'vue';
import { getobjm } from '../scripts/getobjm';
const container = ref<HTMLDivElement | null>(null)
const objm = getobjm();

nextTick(() => {
    if (!container.value) return;
    const czmviewer = objm.createCesiumViewer(container.value);
    //@ts-ignore
    window.g_viewer = czmviewer;
})

</script>

<template>
    <div class="w-full h-full" ref="container">

    </div>
</template>
