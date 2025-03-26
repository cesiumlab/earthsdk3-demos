<template>

  <Container></Container>

  <MainBar></MainBar>

  <TreeContainer></TreeContainer>
</template>

<script setup lang="ts">
import { ESObjectsManager } from 'earthsdk3';
import Container from './package/Container.vue';
import MainBar from './package/MainBar.vue';
import TreeContainer from './package/TreeContainer.vue';

import { provide } from 'vue';
const props = withDefaults(defineProps<{ objm: ESObjectsManager; }>(), {});
provide('objm', props.objm);
</script>
