<template>
    <div class="layout" :data-theme="theme">
        <Header @toggleTheme="toggleTheme"></Header>
        <div class="content">
            <div class="left">
                <ExampleTree :tree="data" @onclick="handlerClick"></ExampleTree>
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
                <ExampleList :list="data" :activeId="activeId"></ExampleList>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import ExampleTree from './components/ExampleTree.vue'
import ExampleList from "./components/ExampleList.vue"
import Header from './components/Header.vue';
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
    background: rgb(20, 20, 20);
    position: relative;
}

.right-search-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    padding: 16px 20px;
    background: rgba(20, 20, 20, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
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
    background: rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 10px 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 0;
}

.search:focus-within {
    border-color: #7aa2ff;
    box-shadow: 0 0 0 3px rgba(122, 162, 255, 0.18), inset 0 1px 2px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.08);
}

.search-icon {
    flex-shrink: 0;
    color: rgba(245, 248, 255, 0.66);
    opacity: 0.8;
    transition: opacity 0.2s ease;
}

.search:focus-within .search-icon {
    opacity: 1;
    color: #7aa2ff;
}

.search input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: rgba(245, 248, 255, 0.94);
    font-size: 14px;
    min-width: 0;
}

.search input::placeholder {
    color: rgba(245, 248, 255, 0.5);
}

.search-btn {
    flex-shrink: 0;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    background: linear-gradient(180deg, #7aa2ff 0%, #5f8eff 100%);
    color: #fff;
    box-shadow: 0 10px 22px rgba(3, 139, 254, 0.22);
    white-space: nowrap;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-btn:hover {
    background: linear-gradient(180deg, #5f8eff 0%, #4d7eff 100%);
    box-shadow: 0 14px 28px rgba(3, 139, 254, 0.3);
    transform: translateY(-1px);
}

.search-btn:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(3, 139, 254, 0.2);
}

.search-label {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(122, 162, 255, 0.16);
    color: #e8f0ff;
    border: 1px solid rgba(122, 162, 255, 0.9);
    white-space: nowrap;
}

.search-list {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    margin-top: 0;
    padding: 4px 0;
    list-style: none;
    background: rgba(20, 20, 20, 0.95);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
    max-height: 320px;
    overflow-y: auto;
    z-index: 100;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.search-list li {
    padding: 10px 16px;
    font-size: 14px;
    color: rgba(245, 248, 255, 0.94);
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: background 0.15s ease, color 0.15s ease;
}

.search-list li:hover {
    background: rgba(122, 162, 255, 0.15);
    color: #7aa2ff;
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
    background: rgba(20, 20, 20, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 12px;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
    box-sizing: border-box;
    overflow: auto;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.right {
    height: 100%;
    width: 84%;
    overflow: hidden;
    background: rgba(20, 20, 20, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 12px;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
    overflow-y: auto;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

/* Smooth scrollbars with arrows */
.left::-webkit-scrollbar,
.right::-webkit-scrollbar {
    width: 18px !important;
}

.left::-webkit-scrollbar-track,
.right::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05) !important;
    border-radius: 9px !important;
}

.left::-webkit-scrollbar-thumb,
.right::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 9px !important;
    border: 1px solid rgba(20, 20, 20, 0.3) !important;
    min-height: 30px;
}

.left::-webkit-scrollbar-thumb:hover,
.right::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.25) !important;
}

/* 滚动条箭头按钮 - 强制显示 */
.left::-webkit-scrollbar-button,
.right::-webkit-scrollbar-button {
    display: block !important;
    height: 18px !important;
    width: 18px !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
    border-radius: 0 !important;
    cursor: pointer !important;
}

/* 向上箭头 */
.left::-webkit-scrollbar-button:vertical:start:decrement,
.right::-webkit-scrollbar-button:vertical:start:decrement {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M6 2L2 6h8L6 2z'/%3E%3C/svg%3E") !important;
    background-size: 12px 12px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 9px 9px 0 0 !important;
}

.left::-webkit-scrollbar-button:vertical:start:decrement:hover,
.right::-webkit-scrollbar-button:vertical:start:decrement:hover {
    background-color: rgba(122, 162, 255, 0.15) !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237aa2ff' d='M6 2L2 6h8L6 2z'/%3E%3C/svg%3E") !important;
}

.left::-webkit-scrollbar-button:vertical:start:decrement:active,
.right::-webkit-scrollbar-button:vertical:start:decrement:active {
    background-color: rgba(122, 162, 255, 0.25) !important;
}

/* 向下箭头 */
.left::-webkit-scrollbar-button:vertical:end:increment,
.right::-webkit-scrollbar-button:vertical:end:increment {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' fill-opacity='0.7' d='M6 10L2 6h8l-4 4z'/%3E%3C/svg%3E") !important;
    background-size: 12px 12px !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 0 0 9px 9px !important;
}

.left::-webkit-scrollbar-button:vertical:end:increment:hover,
.right::-webkit-scrollbar-button:vertical:end:increment:hover {
    background-color: rgba(122, 162, 255, 0.15) !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237aa2ff' d='M6 10L2 6h8l-4 4z'/%3E%3C/svg%3E") !important;
}

.left::-webkit-scrollbar-button:vertical:end:increment:active,
.right::-webkit-scrollbar-button:vertical:end:increment:active {
    background-color: rgba(122, 162, 255, 0.25) !important;
}

/* 隐藏默认的双按钮样式 */
.left::-webkit-scrollbar-button:double-button,
.right::-webkit-scrollbar-button:double-button {
    display: none !important;
}

/* Firefox 滚动条样式 */
.left {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.05);
}

.right {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.05);
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
    background: rgba(122, 162, 255, 0.14);
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
    --bg-app: rgb(20, 20, 20);
    --bg-surface: rgba(20, 20, 20, 0.9);
    --text: rgba(245, 248, 255, 0.94);
    --muted: rgba(245, 248, 255, 0.66);
    --primary: #7aa2ff;
    --primary-strong: #5f8eff;
    --border: rgba(255, 255, 255, 0.10);
    --scrollbar: rgba(255, 255, 255, 0.15);
    --scrollbar-hover: rgba(255, 255, 255, 0.25);
    --highlight: rgba(122, 162, 255, 0.14);
    --shadow-md: 0 18px 44px rgba(0, 0, 0, 0.55);
}

[data-theme='dark'] {
    --bg-app: rgb(20, 20, 20);
    --bg-surface: rgba(20, 20, 20, 0.9);
    --text: rgba(245, 248, 255, 0.94);
    --muted: rgba(245, 248, 255, 0.66);
    --primary: #7aa2ff;
    --primary-strong: #5f8eff;
    --border: rgba(255, 255, 255, 0.10);
    --scrollbar: rgba(255, 255, 255, 0.15);
    --scrollbar-hover: rgba(255, 255, 255, 0.25);
    --highlight: rgba(122, 162, 255, 0.14);
    --shadow-md: 0 18px 44px rgba(0, 0, 0, 0.55);
}
</style>
