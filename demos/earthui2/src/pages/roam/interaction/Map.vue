<template>
    <PopList :title="'默认'">
        <div class="interation_text">
            <p>鼠标左键&nbsp;&nbsp;&nbsp;&nbsp;平移</p>
            <p>鼠标右键&nbsp;&nbsp;&nbsp;&nbsp;旋转</p>
            <p>鼠标中键&nbsp;&nbsp;&nbsp;&nbsp;上下翻转</p>
            <p>鼠标滚轮&nbsp;&nbsp;&nbsp;&nbsp;缩放</p>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue';
</script>
