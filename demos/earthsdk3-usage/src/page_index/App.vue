<template>
    <div class="layout" :data-theme="theme">
        <Header @toggleTheme="toggleTheme"></Header>
        <div class="content">
            <div class="left">
                <Tree :tree="data" @onclick="handlerClick"></Tree>
            </div>
            <div class="right" ref="list">
                <List :list="data" :activeId="activeId"></List>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import Tree from './components/common/Tree.vue'
import List from "./components/List.vue"
import Header from './components/Header.vue';
import axios from "axios";
import { onMounted, ref } from "vue";
import { guid } from '@/scripts/utils'
const data = ref([])
const list = ref(null)
const activeId = ref(null);
const theme = ref('dark')

onMounted(() => {
    axios.get("./data/example.json").then(res => {
        data.value = setObjectId(res.data)
    })
})

function setObjectId(arr) {
    arr.forEach((item) => {
        item.id = guid()
        const children = item.children
        if (children && Array.isArray(children)) setObjectId(item.children);
    });
    return arr;
}

function handlerClick(item) {
    if (!item.children || item.children.length === 0) {
        activeId.value = item.id;
        const dom = document.getElementById(item.id)
        if (!dom) return
        list.value.scrollTo({
            top: dom.offsetTop - 120,
            behavior: "smooth"
        })
    }
}

function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg-app);
}

.content {
    margin-top: 8px;
    width: 100%;
    height: calc(100% - 56px);
    display: flex;
    gap: 12px;
    padding: 12px 0px 12px 12px;
    box-sizing: border-box;
}

.left {
    height: 100%;
    width: 16%;
    min-width: 240px;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    box-sizing: border-box;
    overflow: auto;
}

.right {
    height: 100%;
    width: 84%;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    overflow-y: auto;
    /* hide scrollbar but keep scrollable */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.right::-webkit-scrollbar { width: 0; height: 0; display: none; }

/* Smooth scrollbars */
.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
    width: 8px;
}
.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
    background: var(--scrollbar);
    border-radius: 8px;
}
.left::-webkit-scrollbar-thumb:hover,
.right::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-hover);
}

/* Utility */
.panel {
    background-color: #000;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 650px;
    height: 400px;
}

.highlight {
    background: var(--highlight);
}

/* Responsive */
@media screen and (max-width: 1200px) {
    .left { width: 26%; }
    .right { width: 74%; }
}

@media screen and (max-width: 900px) {
    .content {
        flex-direction: column;
        height: auto;
    }
    .left, .right {
        width: 100%;
        height: auto;
        min-height: 280px;
    }
}
</style>

<style>
:root {
    --bg-app: #f5f7fb;
    --bg-surface: #ffffff;
    --text: #2a313b;
    --muted: #5b6573;
    --primary: #3173f6;
    --primary-strong: #215ee0;
    --border: #e8edf3;
    --scrollbar: #d6deea;
    --scrollbar-hover: #c5d3ea;
    --highlight: #fff4bf;
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.04);
}

[data-theme='dark'] {
    --bg-app: #11151b;
    --bg-surface: #171c24;
    --text: #e8f0fb;
    --muted: #a9b3c2;
    --primary: #7aa2ff;
    --primary-strong: #5f8eff;
    --border: #2c333f;
    --scrollbar: #2c3442;
    --scrollbar-hover: #394356;
    --highlight: #3a3a1f;
    --shadow-md: 0 8px 18px rgba(0, 0, 0, 0.35);
}
</style>
