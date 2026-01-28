<template>
    <div class="tree-root">
        <template v-for="(item, index) in visibleItems" :key="index">
            <div v-if="item.level === 0 && getRootIndex(item) > 0" class="separator-line"></div>
            <TreeItem :item="item" :index="getRootIndex(item)" 
                @toggleExpand="toggleExpand" @onclick="onclick" />
        </template>
        <div class="tree-footer">总示例：{{ totalExamples }}</div>
    </div>
    
</template>
<script setup>
import TreeItem from "./TreeItem.vue";
import { ref, watch, defineProps, defineEmits, computed } from "vue";

const items = ref([])
const selectedItem = ref(null)
const props = defineProps({
    tree: {
        type: Array,
        default: [],
    }
})

const emits = defineEmits(["onclick"])

watch(() => props.tree, (newVal) => {
    items.value = []
    flattenJsonObject(props.tree, null, 0, items.value);
})

watch(selectedItem, (newVal, oldVal) => {
    if (newVal) {
        newVal.selected = true
    }
    if (oldVal) {
        oldVal.selected = false
    }
})

// 树状结构转扁平化内容转一维数组Array，并初始化 expanded
function flattenJsonObject(jsonObjectArray, parent, level, itemsArr) {
    jsonObjectArray.forEach((jsonObject) => {
        jsonObject.level = level;
        jsonObject.parent = parent;
        // 根节点默认展开，其余收起
        jsonObject.expanded = level === 0;
        itemsArr.push(jsonObject);
        if (jsonObject.children && jsonObject.children.length > 0) {
            flattenJsonObject(
                jsonObject.children,
                jsonObject,
                level + 1,
                itemsArr,
            );
        }
    });
}

// 只显示所有父节点都展开的节点
const visibleItems = computed(() =>
    items.value.filter(item => {
        let p = item.parent;
        while (p) {
            if (!p.expanded) return false;
            p = p.parent;
        }
        return true;
    })
)

// 统计叶子节点数量（示例总数）
function countLeafNodes(nodes) {
    let count = 0;
    nodes.forEach((n) => {
        const hasChildren = n.children && n.children.length > 0;
        if (hasChildren) {
            count += countLeafNodes(n.children);
        } else {
            count += 1;
        }
    });
    return count;
}

const totalExamples = computed(() => countLeafNodes(props.tree || []))

function toggleExpand(item) {
    // 只允许一个二级节点（level==1）展开
    if (item.level === 1) {
        // 关闭所有二级节点
        items.value.forEach(node => {
            if (node.level === 1 && node !== item) node.expanded = false;
        });
        item.expanded = !item.expanded;
    } else {
        item.expanded = !item.expanded;
    }
}

// 获取根节点索引（用于分隔线）
function getRootIndex(item) {
    if (item.level === 0) {
        return visibleItems.value.filter(i => i.level === 0).indexOf(item);
    }
    return 0;
}

function onclick(item) {
    emits("onclick", item)
    selectedItem.value = item
    // 如果是二级菜单，自动滚动到对应内容区位置
    if (item.level === 1 && item.id) {
        const dom = document.getElementById(item.id)
        if (dom) {
            dom.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}
</script>
<style scoped>
.tree-root {
    padding: 8px 0;
    color: var(--text, #e0e0e0);
    font-size: 13px;
    background: var(--bg-app, #2a2a2a);
}

.separator-line {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 4px 0;
}

.tree-footer {
    margin-top: 12px;
    padding: 12px 10px 0 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
}
</style>