<template>
    <div class="item" :class="{ selected: item.selected && item.level != 0, 'level-0': item.level == 0 }"
        :style="{ fontSize: item.level == 0 ? '18px' : '15px', paddingLeft: 24 * item.level + 10 + 'px' }"
        @click="onItemClickOrToggle">
        <div class="item-content">
            <span v-if="item.children && item.children.length > 0 && item.level != 0" class="expand-icon" @click.stop="toggleExpand">
                <img :src="expandIcon" alt="" class="arrow-icon" :class="{ expanded: item.expanded }" />
            </span>
            <!-- 叶子节点图标 -->
            <span v-if="isLeafNode" class="leaf-icon">●</span>
            <p class="item-name">{{ item.name }}</p>
        </div>
        <span class="count-badge" v-if="item.level == 1 && item.children && item.children.length > 0">{{ item.children.length }}</span>
    </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from "vue";
import expandIcon from "../assets/expand.png";
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
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease;
    position: relative;
}

.item-content {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
}

.item-name {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.item:hover {
    background: rgba(49, 115, 246, 0.08);
    color: var(--primary) !important;
    box-shadow: 0 1px 4px rgba(3, 139, 254, 0.20);
}

.selected {
    color: var(--primary) !important;
    background: rgba(49, 115, 246, 0.10);
    border: 1px solid rgba(49, 115, 246, 0.45);
    box-shadow: 0 0 0 2px rgba(49, 115, 246, 0.16);
}

.selected::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    bottom: 4px;
    width: 3px;
    border-radius: 999px;
    background: var(--primary);
}

.expand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    cursor: pointer;
    flex-shrink: 0;
}

.arrow-icon {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.7;
    transition: opacity 0.15s ease, transform 0.2s ease;
    transform: rotate(-90deg);
}

.arrow-icon.expanded {
    transform: rotate(0deg);
}

.expand-icon:hover .arrow-icon {
    opacity: 1;
}

.count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    margin-left: auto;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    flex-shrink: 0;
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