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
          <div class="item card" v-for="(item, index) in topic.children" :key="index" @click="trunToEditor(item)"
            :id="item.id" :class="{ highlight: item.id === activeId }">
            <img :src="'./thumbnail/' + item.thumbnail" alt="" 
              style="object-fit: cover;">
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

function trunToEditor(item) {
  const url = window.location.href.replace("index.html", '') + 'example.html?id=' + item.path
  window.open(url, '_blank')
}
</script>

<style scoped>
.list-root {
  width: 100%;
  min-height: 100%;
  background: transparent;
  padding: 14px 22px 24px 22px;
  box-sizing: border-box;
}
.mode {
  margin-bottom: 30px;
}
.group-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 24px;
}
.mode:first-of-type .group-title {
  margin-top: 0;
}
.group-bar {
  width: 4px;
  height: 22px;
  background: linear-gradient(180deg, #7aa2ff 0%, #5f8eff 100%);
  border-radius: 2px;
  margin-right: 10px;
  box-shadow: 0 4px 12px rgba(122, 162, 255, 0.3);
}
.group-title-text {
  font-size: 20px;
  font-weight: 700;
  color: rgba(245, 248, 255, 0.94);
  letter-spacing: 0.2px;
}
.topic {
  padding-top: 10px;
  padding-left: 20px;
  color: var(--primary);
  font-size: 16px;
}
.topic-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(245, 248, 255, 0.94);
  margin-bottom: 10px;
  margin-top: 12px;
}
.topic-count {
  color: #7aa2ff;
  font-size: 14px;
  margin-left: 6px;
}
.card-list {
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 14px 12px;
}
.card {
  width: clamp(200px, 24vw, 260px);
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
  margin-bottom: 0;
  padding-top: 6px;
  transition: box-shadow 0.22s ease, transform 0.18s ease, border-color 0.22s ease, background 0.22s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(122,162,255,0.12), rgba(122,162,255,0) 35%, rgba(122,162,255,0) 65%, rgba(122,162,255,0.12));
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
  background: linear-gradient(145deg, rgba(122,162,255,0.25), rgba(255,255,255,0.0));
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
  transform: translateY(-2px);
  border-color: rgba(122, 162, 255, 0.55);
  background: rgba(255, 255, 255, 0.08);
  transform-origin: center bottom;
}
.card:hover::before { opacity: 1; }
.card:active {
  transform: translateY(-1px) scale(0.995);
}
.card > p {
  font-size: 15px;
  color: rgba(245, 248, 255, 0.94);
  margin: 0;
  margin: 8px 0 12px 0;
  font-weight: 600;
  letter-spacing: 0.2px;
}
.card > img {
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.25);
  width: calc(100% - 18px);
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0,0,0,0.22) inset;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transform: scale(1);
  transition: transform 0.35s ease;
}
.highlight {
  outline: 2px solid rgba(122,162,255,0.35);
  outline-offset: 0px;
  border-color: #7aa2ff !important;
  box-shadow: 0 0 0 4px rgba(49,115,246,0.12), 0 14px 28px rgba(3,139,254,0.20) !important;
  background: linear-gradient(180deg, rgba(122,162,255,0.14) 0%, rgba(122,162,255,0.06) 100%) !important;
}

.highlight::after {
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

@media screen and (max-width: 1200px) {
  .card { width: clamp(180px, 36vw, 236px); min-height: 200px; }
  .card > img { width: calc(100% - 16px); aspect-ratio: 4 / 3; }
}

@media screen and (max-width: 900px) {
  .list-root { padding: 12px; }
  .card { width: calc(50% - 10px); min-height: 200px; }
  .card > img { width: calc(100% - 12px); aspect-ratio: 4 / 3; }
}
</style>
