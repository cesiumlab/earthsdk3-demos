<template>
  <Container></Container>
</template>

<script setup>
import { provide } from 'vue';
import Container from './components/Container.vue';
const props = defineProps(['objm'])
provide('objm', props.objm);
</script>
