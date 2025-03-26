import { createApp } from 'vue';
import App from './App.vue';
import EarthSDKUI from 'earthsdk-ui';
import './scripts/iconfont.js';
import 'earthsdk-ui/lib/style.css';
// import { copyright } from './copyright';
import { $config } from "./scripts/getConfig"
import "cesiumWidgets/widgets.css";
//@ts-ignore
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;
const app = createApp(App)
document.title = $config.title
app.use(EarthSDKUI);
//@ts-ignore
// window.g_xe2_copyright_print = window.g_xe2_copyright_print ?? true;
//@ts-ignore
// window.g_xe2_copyright_print && copyright.print();
app.mount('#app');