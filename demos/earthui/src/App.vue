<template>
  <es-config-provider>
    <div class="earthui-container">
      <EarthUI></EarthUI>
    </div>
  </es-config-provider>
</template>

<script setup lang="ts">
import { EsConfigProvider, useLang, useTheme, i18n } from 'earthsdk-ui';
import EarthUI from './EarthUI.vue';

// 使用主题管理
const { toggleTheme, isDark, setCustomThemeConfig } = useTheme();
//自定义样式
setCustomThemeConfig({ colorPrimary: '#6287F7' });

// 使用语言管理
// const { toggleLang, isZh, t } = useLang();
// console.log('name', i18n.global.t('earthui.header.name'));
// console.log('msg', t('earthui.msg.item', { count: 1 }));

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
