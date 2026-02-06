<template>
    <div class="header">
        <div class="brand">
            <img src="../assets/logo.png" alt="" width="35" height="30">
            <h2>EarthSDK3官方示例</h2>
        </div>
        <div class="vessel">
            <div class="box">
                <img src="../assets/jiaocheng.png" alt="" width="18" height="18">
                <a :href="VERSION_DOC" target="_blank">初学者教程</a>
            </div>
            <div class="box">
                <img src="../assets/api.png" alt="" width="18" height="18">
                <a :href="VERSION_API" target="_blank">API文档</a>
            </div>
            <div class="box">
                <img src="../assets/load.png" alt="" width="18" height="18">
                <a :href="VERSION_CODE" target="_blank">下载源码</a>
            </div>
            <div class="box">
                <img src="../assets/-zixun.png" alt="" width="18" height="18">
                <button @click="viewVersion" class="box-info">版本信息</button>
                <div class="box-version" v-show="versionShow">
                    <div>"cesium": "{{ VERSION_CESIUM }}"</div>
                    <div>"earthsdk3": "{{ VERSION_EARTHSDK3 }}"</div>
                    <div>"earthsdk3-cesium": "{{ VERSION_EARTHSDK3_CESIUM }}"</div>
                    <div>"earthsdk3-ue": "{{ VERSION_EARTHSDK3_UE }}"</div>
                    <div>"earthsdk3-ol": "{{ VERSION_EARTHSDK3_OL }}"</div>
                    <div>"earthsdk3-assets": "{{ VERSION_EARTHSDK3_ASSETS }}"</div>
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

const versionShow = ref(false);
const viewVersion = () => {
    versionShow.value = !versionShow.value;
}

// 从 Vite define 中获取版本信息
const VERSION_API = __VERSION_API__;
const VERSION_CODE = __VERSION_CODE__;
const VERSION_DOC = __VERSION_DOC__;
const VERSION_CESIUM = __VERSION_CESIUM__;
const VERSION_EARTHSDK3 = __VERSION_EARTHSDK3__;
const VERSION_EARTHSDK3_CESIUM = __VERSION_EARTHSDK3_CESIUM__;
const VERSION_EARTHSDK3_UE = __VERSION_EARTHSDK3_UE__;
const VERSION_EARTHSDK3_OL = __VERSION_EARTHSDK3_OL__;
const VERSION_EARTHSDK3_ASSETS = __VERSION_EARTHSDK3_ASSETS__;
</script>

<style scoped>
@media screen and (max-width: 550px) {
    .vessel {
        display: none !important;
    }
}

.box-info {
    position: relative;
    background: rgba(255, 255, 255, 0.06);
    font-size: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(245, 248, 255, 0.94);
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.box-version {
    position: fixed;
    top: 56px;
    right: 20px;
    width: 260px;
    background-color: rgba(20, 20, 20, 0.95);
    color: rgba(245, 248, 255, 0.94);
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.55);
    z-index: 99999;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    pointer-events: auto;
}

.header {
    width: 100%;
    height: 56px;
    background: #141414;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 24px;
    box-sizing: border-box;
    color: #fff !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: relative;
    z-index: 1000;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.brand img {
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
}

h2 {
    padding-left: 10px;
    color: #fdfdfd;
    margin: 0px;
    font-weight: 700;
    letter-spacing: 0.3px;
    font-size: 18px;
}

.header>div {
    display: flex;
}

a {
    color: rgba(245, 248, 255, 0.8);
    font-size: 14px;
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.15s ease, color 0.15s ease;
}

a:hover {
    color: #7aa2ff;
    background: rgba(255, 255, 255, 0.08);
}

.box {
    line-height: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 14px;
    position: relative;
}

.box-info:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(122, 162, 255, 0.4);
    color: #7aa2ff;
}

.toggle {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(245, 248, 255, 0.94);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.2s ease, transform 0.1s ease;
}

.toggle:hover {
    border-color: #7aa2ff;
    background: rgba(122, 162, 255, 0.1);
    box-shadow: 0 6px 14px rgba(3, 139, 254, 0.3);
    transform: translateY(-1px);
    color: #7aa2ff;
}

.toggle:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(3, 139, 254, 0.18);
}
</style>
