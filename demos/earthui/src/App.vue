<template>
  <es-config-provider>
    <div class="earthui-container">
      <EarthUI></EarthUI>
    </div>
  </es-config-provider>
</template>

<script setup lang="ts">
import { EsConfigProvider, ESLang, ESTheme, useLang, useTheme } from 'earthsdk-ui';
import { onBeforeMount } from 'vue';
import EarthUI from './EarthUI.vue';
import { $g_objm } from './global';
onBeforeMount(() => {
  const { setCustomThemeConfig, setTheme } = useTheme();
  const { setLang } = useLang();

  const xbsjEarthUi = $g_objm();
  const { theme, lang, colorPrimary } = xbsjEarthUi.initConfig;

  setCustomThemeConfig({ colorPrimary: colorPrimary ?? '#6287F7' }); //E33D30
  theme && setTheme(theme as ESTheme);
  lang && setLang(lang as ESLang);
})

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
