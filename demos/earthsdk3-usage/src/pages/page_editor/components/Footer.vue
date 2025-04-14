<template>
    <div class="footer">
        <div class="title">
            <p :class="{ active: index === titleIndex }" v-for="(title, index) in data" :key="index"
                @click="selectTitle(index)">{{ title.name }}</p>
        </div>
        <div class="items" v-if="data && data.length > 0" ref="items">
            <div :class="{ activeItem: item === curItem }" v-for="(item, index) in data[titleIndex].children"
                @click="selectItem(item, index)">
                <p>{{ item.name }}</p>
                <img :src="'./thumbnail/' + item.thumbnail" alt="" width='125' height="90">
            </div>
        </div>
    </div>


</template>
<script setup>
import { onMounted, ref, defineEmits, watch } from "vue";
import axios from "axios";
import { getUrlParam } from "@/scripts/utils.js"

const emits = defineEmits('changeSrc')
const data = ref([])
const curItem = ref(0)
const titleIndex = ref(0)

const items = ref()

function setScroolFun() {
    // 添加监听事件
    items.value.addEventListener('mousewheel', handlerMouserScroll, false)//滚轮事件
}
function handlerMouserScroll(event) {
    if (!items.value) return;
    //获取滚轮跨距，兼容获取方式
    let detail = event.wheelDelta || event.detail || event.wheelDeltaY

    /*反向*/
    let moveForwardStep = -1
    /*正向*/
    let moveBackStep = 1
    let step = 0
    //如果跨步大于0，表明正向跨步，将跨步放大100倍，改变滑动速度，如果跨步小于0，表明反向跨步，将跨步放大500倍，改变滑动速度
    step = detail > 0 ? moveForwardStep * 80 : moveBackStep * 80
    /*覆盖当前滚动条的位置,单位是像素，叠增或剃减*/
    items.value.scrollLeft = items.value.scrollLeft + step

    //平滑值(越小越慢，不能小于等于0)
    let slipNum = 0.5
    //末尾值（越小，则越平稳，越大越仓促）
    let endNum = 1
    /*递减步伐值*/
    let decreasingPaceNum = step
    /*速度*/
    let paceNum = 50;

    let t = setInterval(() => {
        if (!items.value) return;
        if (Math.abs(decreasingPaceNum) < endNum) {
            clearInterval(t)
            return
        }
        decreasingPaceNum = decreasingPaceNum * slipNum
        items.value.scrollLeft = items.value.scrollLeft + decreasingPaceNum
    }, paceNum)
}

onMounted(() => {
    let urlparam = getUrlParam()
    axios.get("./data/example.json").then(res => {
        data.value = []
        let arr = res.data
        arr.forEach((el, index) => {
            let obj = { name: el.name, children: [] }
            el.children.forEach(item => {
                obj.children.push(...item.children)
                item.children.forEach(c => {
                    if (c.path == urlparam.id) {
                        curItem.value = c
                        titleIndex.value = index
                    }
                })
            })
            data.value.push(obj)
        });

    })
})

watch(items, () => {
    if (!items.value) return;
    setScroolFun()
})

function selectTitle(index) {
    titleIndex.value = index
}


function selectItem(item) {
    curItem.value = item
    // 获取当前URL
    var url = new URL(window.location.href);

    // 将修改后的参数设置回URL
    url.search = "?id=" + item.path

    // 使用history.replaceState()方法修改URL，而不刷新页面
    history.replaceState(null, '', url.href);
    emits('changeSrc', `./examples/${item.path}/index.html`)
}



</script>
<style scoped>

.footer {
    flex-shrink: 0;
    width: 100%;
    height: 195px !important;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #efefef;
}

.footer>div {
    display: flex;
}

.title {
    padding: 10px 10px 5px 10px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #bcd8f4;
    background-repeat: repeat-x;
    background-image: -moz-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -webkit-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -o-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
}

.title>p {
    margin-right: 10px;
    padding: 2px 10px;
    cursor: pointer;
}

.items {
    padding: 3px 10px 5px 10px;
    overflow-x: auto;

}

.items>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    border: 1px solid #759dc0;
    padding: 2px 4px 4px 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #bcd8f4;
    background-repeat: repeat-x;
    background-image: -moz-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -webkit-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -o-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    margin-right: 8px;


}

.items>div>p {
    color: #000;
    white-space: nowrap;
    padding: 5px;

}

.active {
    border: 1px solid #71b3f5;
    border-radius: 5px;
    background-color: #71b3f5;
    background-repeat: repeat-x;
    background-image: -moz-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -webkit-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: -o-linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
    background-image: linear-gradient(#ffffff 0px, rgba(255, 255, 255, 0) 3px, rgba(255, 255, 255, 0.75) 100%);
}

.activeItem {
    border: 1px solid #3696f5 !important;
    border-radius: 5px !important;
    background-color: #3696f5 !important;
}
</style>