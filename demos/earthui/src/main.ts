import EarthSDKUI from 'earthsdk-ui';
import 'earthsdk-ui/lib/style.css';
import { createApp, watch } from 'vue';
import App from './App.vue';
import './scripts/iconfont.js';
import { $config, useRightSidebarWidthFunc } from "./global";
// import "cesiumWidgets/widgets.css";
//@ts-ignore
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;
const app = createApp(App)
document.title = $config.title


const { rightSidebarWidth } = useRightSidebarWidthFunc();
/** 全局注入设置右侧边栏宽度 */
watch(rightSidebarWidth, (value) => {
    document.documentElement.style.setProperty('--right-sidebar-width', `${value}px`);
}, { immediate: true });

app.use(EarthSDKUI);
app.mount('#app');
