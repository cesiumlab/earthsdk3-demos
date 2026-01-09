<template>
  <div style="width: 100%; padding: 15px">
    <div class="lab_Property_header">
      <div
        class="header_item"
        v-for="item in propertiesMenu"
        :key="item.component"
        @click="currentMenu = item.component"
      >
        <span
          class="header_item_span"
          :class="currentMenu === item.component ? 'header_active' : ''"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <ActorClass v-if="currentMenu === 'actorClass'"></ActorClass>
    <ActorTag v-if="currentMenu === 'actorTag'"></ActorTag>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, inject } from 'vue'
import ActorClass from './ActorClass.vue'
import ActorTag from './ActorTag.vue'
let propertiesMenu: { name: string; component: string }[] = [
  {
    name: '绑定场景已有对象',
    component: 'actorTag'
  },
  {
    name: '通过引用路径创建',
    component: 'actorClass'
  }
]
const currentMenu = ref('actorTag')
</script>
<style scoped></style>
