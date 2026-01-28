<template>
    <div class="list-root">
        <div class="mode" v-for="mode in list" :key="mode.id" :id="mode.id">
            <div class="group-title">
                <span class="group-bar"></span>
                <span class="group-title-text">{{ mode.name }}</span>
            </div>
            <div class="topic" v-for="topic in mode.children" :key="topic.id" :id="topic.id">
                <div class="topic-title">
                    {{ topic.name }}<span class="topic-count">({{ topic.children.length }})</span>
                </div>
                <div class="card-list">
                    <div class="card" v-for="item in topic.children" :key="item.id" 
                        :id="item.id" 
                        :class="{ highlight: item.id === activeId }"
                        @click="turnToEditor(item)">
                        <img :src="`./thumbnail/${item.thumbnail}`" :alt="item.name">
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    list: {
        type: Array,
        default: [],
    },
    activeId: {
        type: String,
        default: null,
    }
})

function turnToEditor(item) {
    const baseUrl = window.location.href.replace("index.html", '')
    window.open(`${baseUrl}example.html?id=${item.path}`, '_blank')
}
</script>

<style scoped>
.list-root {
    width: 100%;
    min-height: 100%;
    padding: 14px 22px 24px;
    box-sizing: border-box;
}

.mode {
    margin-bottom: 30px;
}

.group-title {
    display: flex;
    align-items: center;
    margin: 24px 0 12px;
}

.mode:first-of-type .group-title {
    margin-top: 0;
}

.group-bar {
    width: 4px;
    height: 22px;
    background: linear-gradient(180deg, var(--primary) 0%, #5f8eff 100%);
    border-radius: 2px;
    margin-right: 10px;
    box-shadow: 0 4px 12px rgba(122, 162, 255, 0.3);
}

.group-title-text {
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 0.2px;
}

.topic {
    padding: 10px 0 0 20px;
    font-size: 16px;
}

.topic-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin: 12px 0 10px;
}

.topic-count {
    color: var(--primary);
    font-size: 14px;
    margin-left: 6px;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 12px;
    padding-top: 10px;
}

.card {
    width: clamp(200px, 24vw, 260px);
    min-height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 6px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.22s ease, transform 0.18s ease, 
                border-color 0.22s ease, background 0.22s ease;
}

.card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(122,162,255,0.12), rgba(122,162,255,0) 35%, 
                                rgba(122,162,255,0) 65%, rgba(122,162,255,0.12));
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
}

.card::after {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 14px;
    background: linear-gradient(145deg, rgba(122,162,255,0.25), rgba(255,255,255,0));
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.card:hover {
    transform: translateY(-2px);
    border-color: rgba(122, 162, 255, 0.55);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
}

.card:hover::before {
    opacity: 1;
}

.card:active {
    transform: translateY(-1px) scale(0.995);
}

.card p {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin: 8px 0 12px;
    letter-spacing: 0.2px;
}

.card img {
    width: calc(100% - 18px);
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    object-fit: cover;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    box-shadow: 0 1px 2px rgba(0,0,0,0.22) inset;
    transition: transform 0.35s ease;
}

.highlight {
    outline: 2px solid rgba(122,162,255,0.35);
    border-color: var(--primary) !important;
    background: linear-gradient(180deg, rgba(122,162,255,0.14) 0%, rgba(122,162,255,0.06) 100%) !important;
    box-shadow: 0 0 0 4px rgba(49,115,246,0.12), 0 14px 28px rgba(3,139,254,0.20) !important;
}

.highlight::after {
    opacity: 0.9;
    background: linear-gradient(135deg, rgba(122,162,255,0.25), rgba(255,255,255,0));
}

@media screen and (max-width: 1200px) {
    .card { 
        width: clamp(180px, 36vw, 236px); 
        min-height: 200px; 
    }
    .card img { 
        width: calc(100% - 16px); 
    }
}

@media screen and (max-width: 900px) {
    .list-root { 
        padding: 12px; 
    }
    .card { 
        width: calc(50% - 10px); 
        min-height: 200px; 
    }
    .card img { 
        width: calc(100% - 12px); 
    }
}
</style>
