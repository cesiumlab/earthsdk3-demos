<template>
  <Container></Container>
</template>
<script setup>
import { provide } from 'vue';
import Container from './components/Container.vue';
const props = defineProps(['objm']);
//暴露为全局变量
provide('objm', props.objm);
</script>
