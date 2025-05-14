import { createApp } from 'vue'
import './style.css';
import App from './App.vue'

import { ESObjectsManager } from 'earthsdk3';
import { ESUeViewer } from 'earthsdk3-ue';
import { ESOlViewer } from 'earthsdk3-ol';//未安装记得去除
import { ESCesiumViewer } from 'earthsdk3-cesium';

const objm = new ESObjectsManager(ESUeViewer, ESCesiumViewer, ESOlViewer);

//@ts-ignore
window.g_objm = objm;

createApp(App, { objm }).mount('#app');

//czm和ue的图层
objm.sceneTree.createSceneObjectTreeItemFromJson({
    "id": "ae103185-08c7-4ed0-b6d4-15ad77bbbf66",
    "type": "ESImageryLayer",
    "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "maximumLevel": 18,
    "name": "全球影像",
    "allowPicking": true
})

//openlayers的图层
objm.sceneTree.createSceneObjectTreeItemFromJson({
    "id": "ae103185-08c7-4ed0-b6d4-15ad77bbbf45",
    "type": "ESXYZLayer",
    "url": "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=abd187e1140259634e44eea628b65e00"
})
