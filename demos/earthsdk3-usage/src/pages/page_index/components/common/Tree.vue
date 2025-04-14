<template>
    <TreeItem v-for="(item, index) of items" :key="index" :item="item" @onclick="onclick"></TreeItem>
</template>
<script setup>
import TreeItem from "./TreeItem.vue";
import { onBeforeUnmount, onMounted, ref, watch, defineEmits } from "vue";

const items = ref([])
const selectedItem = ref(null)
const props = defineProps({
    tree: {
        type: Array,
        default: [],
    }
})

const emits = defineEmits(["onclick"])

// 监听tree的变化
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

// 树状结构转扁平化内容转一维数组Array
function flattenJsonObject(jsonObjectArray, parent, level, items) {
    jsonObjectArray.forEach((jsonObject) => {
        if (jsonObject.children) {
            jsonObject.level = level;
            jsonObject.parent = parent;
            items.push(jsonObject);
            flattenJsonObject(
                jsonObject.children,
                jsonObject,
                level + 1,
                items,
            );
        }
    });
}

function onclick(item) {
    emits("onclick", item)
    selectedItem.value = item
}
</script>
<style scoped></style>