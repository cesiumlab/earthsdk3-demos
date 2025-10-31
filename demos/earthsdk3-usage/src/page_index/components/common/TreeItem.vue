<template>
    <div class="item" :class="{ selected: item.selected }"
        :style="{ fontSize: item.level == 0 ? '18px' : '15px', paddingLeft: 24 * item.level + 10 + 'px' }"
        @click="onItemClickOrToggle">
    <span v-if="item.children && item.children.length > 0 && item.level != 0" @click.stop="toggleExpand">
      {{ item.expanded ? '▾' : '▸' }}
    </span>
    <!-- 叶子节点图标 -->
    <span v-if="isLeafNode" class="leaf-icon">●</span>
        <p> {{ item.name }} <span class="label" v-if="item.level == 1">({{ item.children.length }})</span></p>
    </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const emits = defineEmits(["toggleExpand", "onclick"])

// 判断是否为叶子节点（最后一个层级）
const isLeafNode = computed(() => {
    return !props.item.children || props.item.children.length === 0;
})

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
    color: var(--text);
    padding: 8px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.15s ease, color 0.15s ease;
}

.item:hover {
    background: rgba(49, 115, 246, 0.08);
    color: var(--primary) !important;
}

.selected {
    color: var(--primary) !important;
    background: rgba(49, 115, 246, 0.12);
    border: 1px solid var(--border);
}

.label {
    color: var(--primary);
    padding-left: 6px;
}

.leaf-icon {
    margin-right: 10px;
    font-size: 11px;
    opacity: 0.85;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(49, 115, 246, 0.12);
    color: var(--primary);
    font-weight: 700;
    line-height: 1;
}

.item:hover .leaf-icon {
    opacity: 1;
    background: rgba(49, 115, 246, 0.24);
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(3, 139, 254, 0.18);
}

.selected .leaf-icon {
    opacity: 1;
    background: var(--primary);
    color: #fff;
    box-shadow: 0 2px 6px rgba(3, 139, 254, 0.22);
}
</style>