<template>
  <div class="item" :class="{ selected: item.selected }"
    :style="{ fontSize: item.level == 0 ? '18px' : '15px', paddingLeft: 24 * item.level + 10 + 'px' }"
    @click="onItemClickOrToggle">
    <span v-if="item.children && item.children.length > 0 && item.level != 0" @click="toggleExpand">
      {{ item.expanded ? '▾' : '▸' }}
    </span>
    <p> {{ item.name }} <span class="label" v-if="item.level == 1">({{ item.children.length }})</span></p>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const emits = defineEmits(["toggleExpand", "onclick"])
function toggleExpand() {
    emits("toggleExpand", props.item);
}
function onItemClick() {
    emits("onclick", props.item);
}
// 新增：第二层级点击整行时也能展开/收缩
function onItemClickOrToggle() {
    if (props.item.level === 1 && props.item.children && props.item.children.length > 0) {
        toggleExpand();
    }
    onItemClick();
}
</script>
<style scoped>
.item {
    color: #000;
    padding: 3px 0px;
    display: flex;
    align-items: center;
}

.item:hover {
    color: #038bfe !important;
}

.selected {
    color: #038bfe !important;
}

.label {
    color: #038bfe;
    padding-left: 2px;
}
</style>