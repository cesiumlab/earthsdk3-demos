<template>
    <div class="tree-root">
        <TreeItem v-for="(item, index) in visibleItems" :key="index" :item="item" @toggleExpand="toggleExpand"
            @onclick="onclick" />
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
    padding: 10px 8px 16px 8px;
    color: var(--text);
}
</style>