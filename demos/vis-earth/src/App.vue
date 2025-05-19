<script setup lang="ts">
import { provide } from 'vue';
import Container from './components/Container.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import type { VisObjectsManager } from './scripts/VisObjectsManager';
const props = withDefaults(defineProps<{ objm: VisObjectsManager; }>(), {});
provide('objm', props.objm);
</script>

<template>
  <div class="w-full h-full relative p-0 m-0">
    <Container></Container>
    <Header></Header>
    <Footer></Footer>
  </div>
</template>
