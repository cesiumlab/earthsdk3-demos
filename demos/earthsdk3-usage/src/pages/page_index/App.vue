<template>
    <div class="layout">
        <Header></Header>
        <div class="content">
            <div class="left">
                <Tree :tree=data @onclick="handlerClick"></Tree>
            </div>
            <div class="right" ref="list">
                <List :list="data"></List>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Tree from './components/common/Tree.vue'
import List from "./components/List.vue"
import axios from "axios";
import { onMounted, ref } from "vue";
import { guid } from '@/scripts/utils'
const data = ref([])
const list = ref(null)


onMounted(() => {
    axios.get("./data/example.json").then(res => {
        data.value = setObjectId(res.data)
    })
})

/**
 * 处理数据每项增加id
 * @param {*} arr 
 */
function setObjectId(arr) {
    arr.forEach((item) => {
        item.id = guid()
        const children = item.children
        if (children && Array.isArray(children)) setObjectId(item.children);
    });
    return arr;
}

function handlerClick(item) {
    const dom = document.getElementById(item.id)
    if (!dom) return
    list.value.scrollTo({
        top: dom.offsetTop - 120,//需要父元素设置postion(relative、absolute、fixed)
        behavior: "smooth"
    })
}



</script>
<style scoped>
@media screen and (max-width: 550px) {
    .left {
        display: none !important;
    }
}

.layout {
    width: 100%;
    height: 100%;
}

.content {
    margin-top: 8px;
    width: 100%;
    height: calc(100% - 78px);
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
</style>
