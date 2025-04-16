import { ESObjectsManager } from 'earthsdk3';
import { ESCesiumViewer } from 'earthsdk3-cesium';
import { ESOlViewer } from 'earthsdk3-ol';
import { ESUeViewer } from 'earthsdk3-ue';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const objm = new ESObjectsManager(ESUeViewer, ESCesiumViewer, ESOlViewer);
//调试
window.g_objm = objm;

createApp(App, { objm }).mount('#app');

//创建一个影像图层
objm.sceneTree.createSceneObjectTreeItemFromJson({
    "id": "ae103185-08c7-4ed0-b6d4-15ad77bbbf66",
    "type": "ESImageryLayer",
    "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "maximumLevel": 18,
    "name": "全球影像",
    "allowPicking": true
})
