<template>
    <div class="layout">
        <Resize :resizeAll="editorShow">
            <template v-slot:code>
                <CodeEdit v-model:code="code" v-show="editorShow"></CodeEdit>
            </template>
            <template v-slot:earth>
                <EarthViewer :code="code" v-model:editorShow="editorShow"></EarthViewer>
            </template>
        </Resize>
        <div class="footerBox">
            <div class="expand">
                <img src="./assets/expand.png" alt="" width="40" height="30" @click="footerShow = !footerShow"
                    :class="{ 'expand-active': !footerShow }">
            </div>
            <Footer v-show="footerShow" @changeSrc="changeSrc"></Footer>
        </div>
    </div>
</template>

<script setup>
import CodeEdit from './components/CodeEdit.vue';
import EarthViewer from "./components/EarthViewer.vue"
import Resize from './components/Resize.vue';
import Footer from './components/Footer.vue';
import { onMounted, ref, watch } from "vue";
import { getUrlParam } from "@/scripts/utils.js"
const code = ref(null)
const editorShow = ref(false)
const footerShow = ref(true)

onMounted(() => {
    let obj = getUrlParam()
    let url = `./examples/${obj.id}/index.html`
    changeSrc(url)
})

function changeSrc(src) {
    fetch(src).then(response => response.text()).then((value) => {
        code.value = value
    })
}



</script>
<style scoped>
@media screen and (max-width: 550px) {
    .footerBox {
        display: none !important;
    }
}
.footerBox{
    background: rgb(20, 20, 20);
}

.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.content {
    height: calc(100% - 190px)
}

.expand {
    position: relative;
    height: 0px;
}

.expand img {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}

.expand img:hover {
    content: url(./assets/expandactive.png);

}

.expand-active {
    animation: expand 0.5s;
    animation-fill-mode: forwards;
}

.expand-hidden {
    animation: expand 0.5s;
    animation-direction: reverse;
    animation-fill-mode: forwards;
}

@keyframes expand {
    0% {
        transform: rotate(0deg);
        transform-origin: center center;
    }

    100% {
        transform: rotate(180deg);
        transform-origin: center center;
    }
}

@keyframes hover {
    0% {
        transform: rotate(0deg);
        transform-origin: center center;
    }

    100% {
        transform: rotate(360deg);
        transform-origin: center center;
    }
}
</style>
