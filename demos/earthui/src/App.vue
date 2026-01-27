<template>
  <es-el-config-provider>
    <div class="earthui-container">
      <EarthUI :newList="newList"></EarthUI>
    </div>
  </es-el-config-provider>
</template>

<script setup lang="ts">
import { EsElConfigProvider, useTheme } from 'earthsdk-ui';
import { shallowRef, watch } from 'vue';
import EarthUI from './EarthUI.vue';
import { NavType } from './types';
import { useRightSidebarWidthFunc } from './global';
// 使用主题管理
const { setCustomThemeConfig } = useTheme();
// 使用语言管理
// const { toggleLanguage, isZhCN } = useLanguage();

//自定义样式
setCustomThemeConfig({ colorPrimary: '#6287F7' });

const newList = shallowRef<NavType[]>([]);


const { rightSidebarWidth } = useRightSidebarWidthFunc()
/** 全局注入设置右侧边栏宽度 */
watch(
  rightSidebarWidth,
  (value) => {
    document.documentElement.style.setProperty('--right-sidebar-width', `${value}px`)
  },
  { immediate: true }
)

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
