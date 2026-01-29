import EarthSDKUI from 'earthsdk-ui'
import 'earthsdk-ui/lib/style.css'
import { ESCesiumViewer } from 'earthsdk3-cesium'
import { ESOlViewer } from 'earthsdk3-ol'
import { ESUeViewer } from 'earthsdk3-ue'
import { createApp } from 'vue'
import { gget } from "./api"
import App from './App.vue'
import { initSceneJson } from './global'
import './scripts/iconfont.js'
import { XbsjEarthUi } from './scripts/xbsjEarthUi'

async function main() {
  try {
    // 先加载配置
    const earthui_config = await gget('./config.json');
    document.title = earthui_config.title;
    const initConfig = await initSceneJson(earthui_config);
    console.log('initConfig', initConfig);

    // 创建 xbsjEarthUi 实例
    const xbsjEarthUi = new XbsjEarthUi(initConfig, [ESUeViewer, ESCesiumViewer, ESOlViewer]);
    xbsjEarthUi.json = initConfig.scene;

    // 创建 Vue 实例 全局挂载
    const app = createApp(App);
    app.provide('earthui-config', earthui_config);
    app.provide('xbsjEarthUi', xbsjEarthUi);

    // @ts-ignore
    window.g_xbsjEarthUi = xbsjEarthUi;
    // @ts-ignore
    window.g_objm = xbsjEarthUi;

    // 再挂载
    app.use(EarthSDKUI);
    app.mount('#app');
  } catch (error) {
    console.error(error);
  }
}

main();
