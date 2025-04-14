<template>
    <div class="mode" v-for="mode in list" :key="mode.id" :id="mode.id">
        <p>{{ mode.name }}</p>
        <div class="topic" v-for="topic in mode.children" :key="topic.id" :id="topic.id">
            <p>{{ topic.name }}({{ topic.children.length }})</p>
            <div>
                <div class="item" v-for="(item, index) in topic.children" :key="index" @click="trunToEditor(item)">
                    <img :src="'./thumbnail/' + item.thumbnail" alt="" width='260' height="200"
                        style="object-fit: cover;">
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, defineProps } from "vue";
const props = defineProps({
    list: {
        type: Array,
        default: [],
    }
})

function trunToEditor(item) {
    const url = window.location.href.replace("index.html", '') + 'example.html?id=' + item.path
    window.open(url)
}
</script>

<style scoped>
.mode {
    padding: 20px;
}

.mode>p {
    padding: 0px;
    margin: 0px;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background: #def0ff;
    text-align: center;
    line-height: 40px;
    color: #038bfe;
}

.topic {
    padding-top: 10px;
    padding-left: 50px;
    color: #038bfe;
    font-size: 17px;
}

.topic>div {
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.item {
    width: 280px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: #f2f6fa;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 40px;
}

.item>p {
    font-size: 14px;
    color: #000;
}

.item>img:hover {
    transition-duration: 0.5s;
    transform: scale(1.05);
    cursor: pointer;
}
</style>
