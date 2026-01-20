<template>
  <es-el-config-provider>
    <div class="earthui_box">
      <EarthUI :newList="newList"></EarthUI>
    </div>
  </es-el-config-provider>
</template>

<script setup lang="ts">
import { EsElConfigProvider, useTheme } from 'earthsdk-ui'
import { shallowRef } from 'vue'
import EarthUI from './EarthUI.vue'
import { NavType } from './types'
// 使用主题管理
const {
  // toggleTheme,
  // isDark,
  setCustomThemeConfig
} = useTheme()
// 使用语言管理
// const { toggleLanguage, isZhCN } = useLanguage();

//自定义样式
setCustomThemeConfig({ colorPrimary: '#6287F7' })

const newList = shallowRef<NavType[]>([])
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
.earthui_box {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
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
