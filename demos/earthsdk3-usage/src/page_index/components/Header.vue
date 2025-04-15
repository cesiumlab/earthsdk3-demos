<template>
    <div class="header">
        <div>
            <img src="../assets/logo.png" alt="" width="35" height="30">
            <h2>EarthSDK3官方示例</h2>
        </div>
        <div class="vessel">
            <div class="box">
                <img src="../assets/jiaocheng.png" alt="" width="18" height="18">
                <a :href="data.doc" target="_blank">初学者教程</a>
            </div>
            <div class="box">
                <img src="../assets/api.png" alt="" width="18" height="18">
                <a :href="data.api" target="_blank">API文档</a>
            </div>
            <div class="box">
                <img src="../assets/load.png" alt="" width="18" height="18">
                <a :href="data.code" target="_blank">下载源码</a>
            </div>
            <div class="box">
                <img src="../assets/-zixun.png" alt="" width="18" height="18">
                <button @click="viewVersion" class="box-info">版本信息</button>
                <div class="box-version" v-show="versionShow">
                    <div>"earthsdk3": "{{ data.earthsdk3 }}"</div>
                    <div>"earthsdk3-cesium": "{{ data["earthsdk3-cesium"] }}"</div>
                    <div>"earthsdk3-ue": "{{ data["earthsdk3-ue"] }}"</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { version } from "@/scripts/version.js"
const data = { ...version };
const versionShow = ref(false);
const viewVersion = () => {
    versionShow.value = !versionShow.value;
}
</script>

<style scoped>
@media screen and (max-width: 550px) {
    .vessel {
        display: none !important;
    }
}

.box-info {
    position: relative;
    background: #010101;
    font-size: 16px;
    border: none;
    color: #1690d9;
}

.box-version {
    position: absolute;
    top: 8%;
    right: 2%;
    width: 15%;
    background-color: #525455;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
}

.header {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #010101;
    padding-left: 20px;
    box-sizing: border-box;
    padding-right: 30px;
}

h2 {
    padding-left: 10px;
    color: #fffdfd;
    margin: 0px;
    font-weight: bold;
}

.header>div {
    display: flex;
}

a {
    color: #1690d9;
    font-size: 16px;
    text-decoration: none;
}

a:hover {
    color: #2fb3ff;
}

.box {
    line-height: 30px;
    display: flex;
    align-items: center;
    padding-right: 10px;
}
</style>
