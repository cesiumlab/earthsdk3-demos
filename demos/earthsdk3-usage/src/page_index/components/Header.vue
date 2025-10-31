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
                    <div>"earthsdk3-assets": "{{ data["earthsdk3-assets"] }}"</div>
                </div>
            </div>
            <div class="box">
                <button class="toggle" @click="$emit('toggleTheme')">切换主题</button>
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
    background: #2a313b;
    font-size: 14px;
    border: 1px solid #3b4654;
    color: #d8e8ff;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.box-version {
    position: absolute;
    top: 36px;
    right: 0;
    width: 260px;
    background-color: #1f2630;
    color: #e8f0fb;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #2e3846;
    box-shadow: 0 12px 24px rgba(0,0,0,0.28);
    z-index: 10;
}

.header {
    width: 100%;
    height: 56px;
    background: linear-gradient(180deg, #232a34 0%, #1e242c 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 24px;
    box-sizing: border-box;
    color: #fff !important;
    border-bottom: 1px solid #2c333d;
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
    color: #cfe1ff;
    font-size: 14px;
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.15s ease, color 0.15s ease;
}

a:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.08);
}

.box {
    line-height: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 14px;
}

.box-info:hover {
    background: #353e4a;
    border-color: #465365;
    color: #ffffff;
}

.toggle {
    background: var(--bg-surface);
    color: var(--text);
    border: 1px solid var(--border);
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
}
</style>
