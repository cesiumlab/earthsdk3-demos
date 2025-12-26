<template>
    <div class="footer">
        <div class="title">
            <p :class="{ active: index === titleIndex }" v-for="(title, index) in data" :key="index"
                @click="selectTitle(index)">{{ title.name }}</p>
        </div>
        <div class="items" v-if="data && data.length > 0" ref="items">
            <div :class="{ activeItem: item === curItem }" v-for="(item, index) in data[titleIndex].children" :key="item.path || index"
                @click="selectItem(item, index)">
                <p>{{ item.name }}</p>
                <img :src="'./thumbnail/' + item.thumbnail" alt="" width='125' height="90">
            </div>
        </div>
    </div>


</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, defineEmits, watch } from "vue";
import axios from "axios";
import { getUrlParam } from "@/scripts/utils.js"

const emits = defineEmits(['changeSrc'])
const data = ref([])
const curItem = ref(null)
const titleIndex = ref(0)

const items = ref()

let removeWheelListener = null;

function setScrollHandler() {
    if (!items.value) return;
    // 先解绑旧的，避免重复绑定
    if (removeWheelListener) removeWheelListener();

    const el = items.value;
    const onWheel = (event) => handlerMouseScroll(event);
    el.addEventListener('wheel', onWheel, { passive: true });
    removeWheelListener = () => el.removeEventListener('wheel', onWheel);
}
function handlerMouseScroll(event) {
    if (!items.value) return;
    // 使用垂直滚轮驱动横向滚动
    const delta = event.deltaY || 0;
    items.value.scrollLeft = items.value.scrollLeft + delta;
}

onMounted(() => {
    let urlparam = getUrlParam()
    axios.get("./data/example.json").then(res => {
        const arr = Array.isArray(res.data) ? res.data : [];
        const next = [];

        arr.forEach((el, index) => {
            const topics = Array.isArray(el.children) ? el.children : [];
            const flatChildren = topics.flatMap(t => Array.isArray(t.children) ? t.children : []);
            next.push({ name: el.name, children: flatChildren });

            // 定位当前选中项
            flatChildren.forEach((c) => {
                if (c && c.path == urlparam.id) {
                    curItem.value = c;
                    titleIndex.value = index;
                }
            });
        });

        data.value = next;
        // 如果未匹配到 URL 参数，默认选中第一项
        if (!curItem.value && data.value[0] && data.value[0].children && data.value[0].children[0]) {
            curItem.value = data.value[0].children[0];
            titleIndex.value = 0;
        }

    })
})

watch(items, () => {
    if (!items.value) return;
    setScrollHandler()
})

onBeforeUnmount(() => {
    if (removeWheelListener) removeWheelListener();
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
    /* Black glass theme (scoped-safe vars on root element) */
    --footer-bg: rgb(20, 20, 20);
    --footer-border: rgba(255, 255, 255, 0.10);
    --footer-text: rgba(245, 248, 255, 0.94);
    --footer-muted: rgba(245, 248, 255, 0.66);
    --footer-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
    --accent: #7aa2ff;
    --accent-strong: #5f8eff;

    flex-shrink: 0;
    width: 100%;
    height: 220px !important;
    box-sizing: border-box;
    border-radius: 16px;
    background: var(--footer-bg);
    border: 1px solid var(--footer-border);
    box-shadow: var(--footer-shadow);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    overflow: hidden;
}

.footer>div {
    display: flex;
    box-sizing: border-box;
}

/* Top tabs */
.title {
    padding: 10px 12px 8px 12px;
    gap: 8px;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* firefox */
}
.title::-webkit-scrollbar { width: 0; height: 0; display: none; }

.title>p {
    margin: 0;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 12px;
    color: var(--footer-muted);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.2s ease;
}

.title>p:hover {
    color: var(--footer-text);
    background: rgba(255, 255, 255, 0.08);
}

.title>p.active {
    color: #fff;
    background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
    box-shadow: 0 10px 22px rgba(3, 139, 254, 0.22);
}

/* Card rail */
.items {
    padding: 12px 12px 14px 12px;
    box-sizing: border-box;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: stretch;
    scrollbar-width: none; /* firefox */
}
.items::-webkit-scrollbar { width: 0; height: 0; display: none; }

.items>div {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    width: 150px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    padding: 8px 8px 10px 8px;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
    position: relative;
}

.items>div:hover {
    transform: translateY(-2px);
    border-color: rgba(122, 162, 255, 0.55);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
    background: rgba(255, 255, 255, 0.08);
}

.items>div>p {
    margin: 8px 0 8px 0;
    color: var(--footer-text);
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.2px;
}

.items>div>img {
    width: 125px;
    height: 90px;
    border-radius: 12px;
    object-fit: cover;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 1px 2px rgba(0,0,0,0.22) inset;
}

/* Selected card */
.activeItem {
    border-color: var(--accent) !important;
    background: linear-gradient(180deg, rgba(122,162,255,0.14) 0%, rgba(122,162,255,0.06) 100%) !important;
    box-shadow: 0 0 0 4px rgba(49,115,246,0.12), 0 14px 28px rgba(3,139,254,0.20) !important;
}

.activeItem::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 14px;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(122,162,255,0.25), rgba(255,255,255,0.0));
    opacity: 0.9;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    padding: 1px;
}

@media screen and (max-width: 900px) {
    .footer { height: 188px !important; border-radius: 14px; }
    .items>div { width: 140px; }
    .items>div>img { width: 118px; height: 84px; }
}
</style>