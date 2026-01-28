<template>
  <es-el-config-provider>
    <div class="earthui-container">
      <EarthUI></EarthUI>
    </div>
  </es-el-config-provider>
</template>

<script setup lang="ts">
import { EsElConfigProvider, useTheme } from 'earthsdk-ui';
import EarthUI from './EarthUI.vue';
// 使用主题管理
const { setCustomThemeConfig } = useTheme();
// 使用语言管理
// const { toggleLanguage, isZhCN } = useLanguage();

//自定义样式
setCustomThemeConfig({ colorPrimary: '#6287F7' });


</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app,
.earthui-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--el-text-color-regular);
  width: 100%;
  height: 100%;
}

.cesium-viewer-bottom {
  display: none !important;
}

.es-mask-message {
  z-index: 99999 !important;
}
</style>
