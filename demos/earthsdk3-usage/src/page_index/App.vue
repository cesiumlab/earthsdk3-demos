<template>
    <div class="layout" :data-theme="theme">
        <Header @toggleTheme="toggleTheme"></Header>
        <div class="content">
            <div class="left">
                <Tree :tree="data" @onclick="handlerClick"></Tree>
            </div>
            <div class="right" ref="list">
                <div class="right-search-bar">
                    <div class="search-wrapper">
                        <div class="search">
                            <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11.5 10.5L15 14M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input
                                v-model="searchText"
                                type="text"
                                placeholder="搜索示例..."
                                @keyup.enter="searchAndScroll"
                                @focus="searchFocused = true"
                                @blur="setTimeout(() => searchFocused = false, 200)"
                            />
                            <ul class="search-list" v-if="searchText && searchResults.length && searchFocused">
                                <li
                                    v-for="item in searchResults"
                                    :key="item.id"
                                    @mousedown.prevent="selectSearchItem(item)"
                                >
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                        <button class="search-btn" @click="searchAndScroll">
                            <span>搜索</span>
                        </button>
                    </div>
                </div>
                <List :list="data" :activeId="activeId"></List>
            </div>
        </div>
        <!-- <NewYearBanner /> -->
    </div>
    
</template>

<script setup>
import Tree from './components/common/Tree.vue'
import List from "./components/List.vue"
import Header from './components/Header.vue';
import NewYearBanner from './components/NewYearBanner.vue';
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { guid } from '@/scripts/utils'
const data = ref([])
const list = ref(null)
const activeId = ref(null);
const theme = ref('dark')
const searchText = ref('')
const searchFocused = ref(false)
const searchResults = computed(() => {
    const key = searchText.value.trim().toLowerCase();
    if (!key || !Array.isArray(data.value)) return [];
    const leaves = [];
    collectLeafItems(data.value, leaves);
    return leaves.filter(i => String(i.name || '').toLowerCase().includes(key)).slice(0, 10);
})

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

function collectLeafItems(arr, out) {
    if (!Array.isArray(arr)) return;
    arr.forEach((item) => {
        const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
        if (hasChildren) {
            collectLeafItems(item.children, out);
        } else {
            out.push(item);
        }
    });
}

function handlerClick(item) {
    if (!item.children || item.children.length === 0) {
        activeId.value = item.id;
        scrollToId(item.id)
    }
}

function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function scrollToId(id) {
    if (!list.value || !id) return;
    const dom = document.getElementById(id);
    if (!dom) return;
    list.value.scrollTo({
        top: dom.offsetTop - 120,
        behavior: "smooth"
    });
}

function findFirstMatch(arr, keyword) {
    if (!Array.isArray(arr)) return null;
    const key = keyword.trim().toLowerCase();
    if (!key) return null;
    for (const item of arr) {
        const name = (item && item.name) ? String(item.name).toLowerCase() : '';
        const isLeaf = !item.children || !Array.isArray(item.children) || item.children.length === 0;
        if (isLeaf && name.includes(key)) {
            return item;
        }
        if (item.children && Array.isArray(item.children)) {
            const child = findFirstMatch(item.children, key);
            if (child) return child;
        }
    }
    return null;
}

function searchAndScroll() {
    const kw = searchText.value.trim();
    if (!kw) {
        alert('请输入要搜索的示例名称');
        return;
    }
    const item = findFirstMatch(data.value, kw);
    if (!item || !item.id) {
        alert('未找到匹配的示例');
        return;
    }
    activeId.value = item.id;
    scrollToId(item.id);
}

function selectSearchItem(item) {
    if (!item || !item.id) return;
    activeId.value = item.id;
    scrollToId(item.id);
}
</script>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--bg-app);
    position: relative;
}

.right-search-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    padding: 16px 20px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}

[data-theme='dark'] .right-search-bar {
    background: var(--bg-surface);
    border-bottom-color: var(--border);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 600px;
}

.search {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-app);
    border-radius: 8px;
    padding: 10px 14px;
    border: 1px solid var(--border);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 0;
}

.search:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(49, 115, 246, 0.12), inset 0 1px 2px rgba(0, 0, 0, 0.08);
    background: var(--bg-surface);
}

[data-theme='dark'] .search {
    background: rgba(22, 27, 34, 0.6);
    border-color: rgba(88, 166, 255, 0.2);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

[data-theme='dark'] .search:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.18), inset 0 1px 2px rgba(0, 0, 0, 0.2);
    background: rgba(22, 27, 34, 0.9);
}

.search-icon {
    flex-shrink: 0;
    color: var(--muted);
    opacity: 0.6;
    transition: opacity 0.2s ease;
}

.search:focus-within .search-icon {
    opacity: 1;
    color: var(--primary);
}

.search input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text);
    font-size: 14px;
    min-width: 0;
}

.search input::placeholder {
    color: var(--muted);
}

.search-btn {
    flex-shrink: 0;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    background: var(--primary);
    color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    white-space: nowrap;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-btn:hover {
    background: var(--primary-strong);
    box-shadow: 0 4px 12px rgba(49, 115, 246, 0.3);
    transform: translateY(-1px);
}

.search-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.search-label {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(49, 115, 246, 0.08);
    color: var(--primary);
    border: 1px solid rgba(49, 115, 246, 0.45);
    white-space: nowrap;
}

[data-theme='dark'] .search-label {
    background: rgba(122, 162, 255, 0.16);
    border-color: rgba(122, 162, 255, 0.9);
    color: #e8f0ff;
}

.search-list {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    margin-top: 0;
    padding: 4px 0;
    list-style: none;
    background: var(--bg-surface);
    border-radius: 8px;
    border: 1px solid var(--border);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    max-height: 320px;
    overflow-y: auto;
    z-index: 100;
}

[data-theme='dark'] .search-list {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.search-list li {
    padding: 10px 16px;
    font-size: 14px;
    color: var(--text);
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: background 0.15s ease, color 0.15s ease;
}

.search-list li:hover {
    background: rgba(77, 166, 255, 0.1);
    color: var(--primary);
}

[data-theme='dark'] .search-list li:hover {
    background: rgba(77, 166, 255, 0.15);
}

.content {
    margin-top: 6px;
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
}

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
