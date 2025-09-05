<template>
    <div class="xbsj_box">
        <!-- 导航以及模块面板 -->
        <div class="xbsj_header">
            <Menu :navList="navList" :navType="navType" :key="navList"></Menu>
        </div>
        <!-- 视口 -->
        <div class="xbsj_earth">
            <ViewersComp></ViewersComp>
        </div>
        <!-- 场景树 -->
        <DraggablePopup2 v-if="showSceneTreeViewRef" @close="showSceneTreeViewRef = false" :title="'图层管理'" :width="280"
            :height="'410px'" :left="0" :top="40" :iconName="'tucengguanli'" :checkIconIsShow="true"
            :iconIschecked="sceneTreeCheckedIcon" :checkFun="() => sceneTreeCheckedIcon = !sceneTreeCheckedIcon">
            <div class="Layer_Management">
                <div class="Layer_Management_editing">
                    <Editing></Editing>
                </div>
                <div class="Layer_Management_scenetree">
                    <SceneTree v-if="!!sceneTree" :showCheckBox="sceneTreeCheckedIcon" :clickEmpty="clickEmpty"
                        @closeClickEmpty="clickEmpty = false"></SceneTree>
                    <div style="height: 20px;" @contextmenu.stop.prevent="clickEmpty = true"></div>
                </div>
            </div>

        </DraggablePopup2>
        <!-- 属性栏 -->
        <DraggablePopup2 v-if="propSceneTree" :title="propSceneTree ? propSceneTree.name + '属性面板' : '属性面板'" :width="280"
            :height="'370px'" :left="0" :top="482" @close="propSceneTree = undefined">
            <ESPropPanel :treeItem="propSceneTree" :key="propTreeKey"></ESPropPanel>
        </DraggablePopup2>
        <!-- 时间线 -->
        <TimeLine v-show="animationShow"></TimeLine>
        <!-- 拾取面板 -->
        <CzmPickResult @close="czmPickResult = false" :list="czmPinkList" v-if="czmPickResult"></CzmPickResult>
        <!-- 状态栏 指北针 比例尺-->
        <StatusBar v-if="statusBarShow"></StatusBar>
        <Navigator v-if="navigatorShow" :navigatorScaleRight="navigatorScaleRight"></Navigator>
        <Scale v-if="scaleShow" :navigatorScaleRight="navigatorScaleRight"></Scale>
    </div>
    <!-- <NewTime></NewTime> -->
</template>

<script setup lang="ts">
import { createVueDisposer, toRefKey, toVR } from 'earthsdk-ui';
import { onBeforeUnmount, onMounted, provide, ref, shallowRef, watch } from "vue";
import DraggablePopup2 from "./components/DraggablePopup2.vue";
import ESPropPanel from './components/eSPropPanel/ESPropPanel.vue';
import SceneTree from "./components/sceneTree/SceneTree.vue";
import ViewersComp from './components/viewers/Viewers.vue';
import { analysis, engine, environment, images, model, plotting, roam, search, service, terrain, vector, view } from './pages';
import CzmPickResult from "./pages/roam/cousePicking/CzmPickResult.vue";
import { initSceneJson, initSceneWithType, initurl } from './scripts/initializationJson';
import { XbsjEarthUi } from './scripts/xbsjEarthUi';
import TimeLine from "./pages/view/animation/TimeLine.vue";
import { ESCesiumViewer } from 'earthsdk3-cesium';
import { ESUeViewer } from 'earthsdk3-ue';
import { timeToTimestamp, timestampToTime } from './pages/environment/fun';
import Navigator from "./pages/view/control/Navigator.vue";
import Scale from "./pages/view/control/Scale.vue";
import StatusBar from "./pages/view/control/StatusBar.vue";
import { $config } from "./scripts/getConfig";
import Menu from "./views/Menu.vue";
import Editing from './components/editing/Editing.vue';
import { merge3dTilesServer } from "earthsdk3-cesium";
import { ESOlViewer } from 'earthsdk3-ol';

const props = withDefaults(defineProps<{
    newList?: any
    navType?: string
}>(), {});
const clickEmpty = ref(false)
const xbsjEarthUi = new XbsjEarthUi(ESUeViewer, ESCesiumViewer,ESOlViewer);
const sceneTree = xbsjEarthUi.getSceneTree()
xbsjEarthUi.czmlabPath = location.origin
// @ts-ignore
window.g_xbsjEarthUi = xbsjEarthUi;
//@ts-ignore
window.g_xbsjEarthUi.merge3dTilesServer = merge3dTilesServer;

xbsjEarthUi.jsonLoadingEvent.don(() => {
    initSceneWithType(xbsjEarthUi)
    //设置初始化时间的时间戳
    const date = timeToTimestamp(timestampToTime('12', '00'))
    if (xbsjEarthUi.activeViewer) {
        xbsjEarthUi.activeViewer.currentTime = date
    }
})
initurl(xbsjEarthUi)
initSceneJson(xbsjEarthUi)
const czmPickResult = ref(false)
const czmPinkList: any = ref()
provide("xbsjEarthUi", xbsjEarthUi);//所有子组件都可以获取到，不用一层一层传值
provide("sceneTree", sceneTree);//所有子组件都可以获取到，不用一层一层传值
defineExpose({ objectsManager: xbsjEarthUi, sceneTree });
const disposer = createVueDisposer(onBeforeUnmount);
const showSceneTreeViewRef = toVR<boolean>(disposer, [xbsjEarthUi, "showSceneTreeView"])
const propSceneTree = toVR<any>(disposer, [xbsjEarthUi, "propSceneTree"])
const propTreeKey = toRefKey(propSceneTree);
const animationShow = toVR<boolean>(disposer, [xbsjEarthUi, "animationShow"])
const sceneTreeCheckedIcon = toVR<boolean>(disposer, [xbsjEarthUi, "sceneTreeCheckedIcon"])
const navigatorShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "navigatorShow"])
const scaleShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "scaleShow"])
const statusBarShow = toVR<boolean>(disposer, [xbsjEarthUi.navigatorManager, "statusBarShow"])
const navigatorScaleRight = toVR<number>(disposer, [xbsjEarthUi.navigatorManager, "navigatorScaleRight"])
type list = {
    id: number,
    title: string,
    value: string,
    icon: string,
    component: any,
    isShow?: boolean
}[]
const originalList: list = [
    {
        id: 1,
        title: "搜索",
        value: 'search',
        icon: 'sousuo',
        component: search,
        isShow: true
    },
    {
        id: 2,
        title: "漫游",
        value: 'roam',
        icon: 'manyou',
        component: roam,
        isShow: true
    },
    {
        id: 3,
        title: "视图",
        value: 'view',
        icon: 'shitu',
        component: view,
        isShow: true
    },

    {
        id: 4,
        title: "影像",
        value: 'images',
        icon: 'yingxiang',
        component: images,
        isShow: true
    },
    {
        id: 5,
        title: "瓦片",
        value: 'model',
        icon: 'wapian',
        component: model,
        isShow: true
    },
    {
        id: 6,
        title: "地形",
        value: 'terrain',
        icon: 'dixing',
        component: terrain,
        isShow: true
    },
    {
        id: 7,
        title: "矢量",
        value: 'vector',
        icon: 'shiliang',
        component: vector,
        isShow: true
    },
    {
        id: 8,
        title: "分析",
        value: 'analysis',
        icon: 'fenxi',
        component: analysis,
        isShow: true
    },
    {
        id: 9,
        title: "标绘",
        value: 'plotting',
        icon: 'biaohui',
        component: plotting,
        isShow: true
    },
    {
        id: 11,
        title: "环境",
        value: 'environment',
        icon: 'huanjing',
        component: environment,
        isShow: true
    },
    {
        id: 12,
        title: "引擎",
        value: 'engine',
        icon: 'yinqing',
        component: engine,
        isShow: $config.modelShow
    },
    {
        id: 13,
        title: "服务",
        value: 'service',
        icon: 'fuwu',
        component: service,
        isShow: true
    },
]
const navList = shallowRef()
navList.value = originalList
watch(() => props.newList, () => {
    if (props.newList) {
        navList.value = originalList.concat(props.newList)
    }
}, { immediate: true, deep: true })

onMounted(() => {
    xbsjEarthUi.d(xbsjEarthUi.pickResultChanged.don((val) => {
        if (!val) {
            czmPickResult.value = false
        } else {
            czmPinkList.value = val
            czmPickResult.value = true
        }
    }))
})

</script>

<style scoped>
.xbsj_box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.xbsj_header {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 1;
    top: 0;
    z-index: 1000;
    background-color: #2f3034f1;
    border-bottom: 1px solid #111111;
    box-sizing: border-box;
}

.xbsj_earth {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
}



.es_PropPanel {
    position: absolute;
    left: -30px;
    top: 0;
    width: 30px;
    height: 30px;
    background: rgba(37, 38, 42, 1);
    border-bottom: 1px solid rgba(17, 17, 17, 1);
    border-left: 1px solid rgba(17, 17, 17, 1);
    box-sizing: border-box;
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.new_time_line {
    width: 100%;
    height: 200px;
    position: fixed;
    left: 0;
    top: 200px;
}

.Layer_Management {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.Layer_Management_editing {
    width: 100%;
    height: 60px;
}

.Layer_Management_scenetree {
    width: 100%;
    flex: 1;
    overflow: auto;
}
</style>
