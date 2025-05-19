import { ESCesiumViewer } from "earthsdk3-cesium";
import { createApp } from 'vue';
import App from './App.vue';
import "./assets/iconfont.js";
import VisIcon from './components/v-icon/index.vue';
import { VisObjectsManager } from "./scripts/VisObjectsManager";
import './style.css';
const objm = new VisObjectsManager(ESCesiumViewer);
//@ts-ignore
window.g_objm = objm;

const app = createApp(App, { objm });
app.component('VisIcon', VisIcon);
app.mount('#app');