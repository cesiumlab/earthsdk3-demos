import EarthSDKUI from 'earthsdk-ui'
import 'earthsdk-ui/lib/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import './scripts/iconfont.js'
import { gget } from "./api"
import { initSceneJson } from './global'
// import "cesiumWidgets/widgets.css";
//@ts-ignore
// window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true
// const app = createApp(App)
// document.title = $config.title


// app.use(EarthSDKUI);
// app.mount('#app');



async function bootstrap() {
  try {
    // 先加载配置
    const earthui_config = await gget('./config.json');
    document.title = earthui_config.title;
    // const initConfig = await initSceneJson(earthui_config);
    // console.log('initConfig', initConfig)
    //TODO:initSceneJson没写完
    // 创建 Vue 实例
    const app = createApp(App);
    app.provide('earthui-config', earthui_config);
    // 再挂载
    app.use(EarthSDKUI);
    app.mount('#app');
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
