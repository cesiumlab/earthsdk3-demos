<script setup lang='ts'>
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { inject, onMounted } from "vue";

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

onMounted(() => {
    console.log(xbsjEarthUi);
})
</script>

<template>
    <div class="mcp_server">
        mcp_server
    </div>
</template>
<style scoped>
.mcp_server {
    width: 100%;
    height: 100%;
}
</style>
