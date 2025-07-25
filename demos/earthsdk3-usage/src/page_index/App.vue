<template>
    <div class="layout">
        <div class="header-bar">
            <div class="header-left">
                <img class="logo" src="./assets/logo.png" alt="logo" />
                <span class="title">EarthSDK2官方示例</span>
            </div>
            <div class="header-right">
                <a class="header-link" href="#" target="_blank">初学者教程</a>
                <a class="header-link" href="#" target="_blank">API文档</a>
                <a class="header-link" href="#" target="_blank">下载源码</a>
                <a class="header-link" href="#" target="_blank">版本信息</a>
            </div>
        </div>
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
import axios from "axios";
import { onMounted, ref } from "vue";
import { guid } from '@/scripts/utils'
const data = ref([])
const list = ref(null)
const activeId = ref(null);

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
</script>

<style scoped>
.layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.header-bar {
    width: 100%;
    height: 56px;
    background: #232a34;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
}

.header-left {
    display: flex;
    align-items: center;
}

.logo {
    height: 32px;
    margin-right: 12px;
}

.title {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 18px;
}

.header-link {
    color: #fff;
    font-size: 15px;
    text-decoration: none;
    margin-left: 8px;
    transition: color 0.2s;
}

.header-link:hover {
    color: #38a1ff;
}

.content {
    margin-top: 8px;
    width: 100%;
    height: calc(100% - 56px);
    display: flex;
}

.left {
    height: 100%;
    width: 15%;
    background: #ffffff;
    border-right: 4px solid #e0e0e0;
    box-sizing: border-box;
    overflow: auto;
}

.right {
    height: 100%;
    width: 85%;
    background: #ffff;
    overflow-y: auto;
}

.panel {
    background-color: #000;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 650px;
    height: 400px;
}

.highlight {
    background: #ffe58f;
}
</style>
