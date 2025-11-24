<script setup lang='ts'>

import { ref } from 'vue';

const props = withDefaults(defineProps<{ default?: boolean }>(), {});

const emits = defineEmits(['update:modelValue']);

</script>

<template>

    <div>
        大模型对话
    </div>

</template>

<style scoped></style>
