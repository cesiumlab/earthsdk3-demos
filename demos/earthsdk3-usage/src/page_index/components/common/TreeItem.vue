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
    color: #000;
    padding: 3px 0px;
    display: flex;
    align-items: center;
    cursor: pointer;
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

.leaf-icon {
    margin-right: 8px;
    font-size: 12px;
    opacity: 0.7;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e8f4fd;
    color: #038bfe;
    font-weight: bold;
    line-height: 1;
}

.item:hover .leaf-icon {
    opacity: 0.9;
    background: #d1e7fd;
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(3, 139, 254, 0.2);
}

.selected .leaf-icon {
    opacity: 1;
    background: #038bfe;
    color: #fff;
    box-shadow: 0 2px 6px rgba(3, 139, 254, 0.3);
}
</style>