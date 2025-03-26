<template>
    <div class="xbsj-modal-mask">
        <div>
            <img src="../assets/view/Apng_iSpt.png" alt="">
            <p>{{ content }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    content: string
}>(), {});
</script>
<style scoped>
.xbsj-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, .6);
    height: 100%;
    z-index: 10001;
}

.xbsj-modal-mask>div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(50% 50%);
}

img {
    width: 40px;
    height: 40px;
}


</style>