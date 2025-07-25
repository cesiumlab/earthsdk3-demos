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
            <img :src="'./thumbnail/' + item.thumbnail" alt="" width='260' height="200"
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
  background: #f7fafd;
  padding: 0 32px 32px 32px;
  box-sizing: border-box;
}
.mode {
  margin-bottom: 36px;
}
.group-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 32px;
}
.group-bar {
  width: 4px;
  height: 22px;
  background: #038bfe;
  border-radius: 2px;
  margin-right: 10px;
}
.group-title-text {
  font-size: 20px;
  font-weight: 600;
  color: #232a34;
}
.topic {
  padding-top: 10px;
  padding-left: 24px;
  color: #038bfe;
  font-size: 17px;
}
.topic-title {
  font-size: 16px;
  font-weight: 500;
  color: #232a34;
  margin-bottom: 10px;
  margin-top: 18px;
}
.topic-count {
  color: #038bfe;
  font-size: 14px;
  margin-left: 4px;
}
.card-list {
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 24px 20px;
}
.card {
  width: 280px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  margin-bottom: 0;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 6px 18px 0 rgba(3,139,254,0.13);
  transform: scale(1.035);
}
.card > p {
  font-size: 15px;
  color: #232a34;
  margin: 0;
  margin-top: 8px;
  font-weight: 500;
}
.card > img {
  border-radius: 6px;
  background: #f7fafd;
}
.highlight {
  background: #ffe58f !important;
}
</style>
