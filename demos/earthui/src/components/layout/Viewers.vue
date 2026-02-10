<template>
  <div class="view_box" ref="viewersContainer" id="viewersContainer" @dragenter="dragEnter($event)"
    @dragleave="dragLeave($event)" @dragover="dragOver($event)" @drop="dropFile($event)"></div>
</template>
<script setup lang="ts">
import { ESVisualObject, ESVOption } from 'earthsdk3'
import { ESCesiumViewer } from 'earthsdk3-cesium'
import { ESUeViewer } from 'earthsdk3-ue'
import { dayjs, ElMessage } from 'element-plus'
import { inject, nextTick, onMounted, shallowRef } from 'vue'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { createObj, createSceneJson, geoJsonTOESObjects } from '@/composables'
const viewersContainer = shallowRef<HTMLDivElement>()
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi

const dragEnter = (event: Event) => {
  event.preventDefault()
}
const dragLeave = (event: Event) => {
  event.preventDefault()
}
const dragOver = (event: Event) => {
  event.preventDefault()
}
const dropFile = async (event: Event) => {
  event.preventDefault()
  //@ts-ignore
  let fileList = event.dataTransfer.files
  Object.keys(fileList).forEach((item) => {
    const reader = new FileReader()
    reader.readAsText(fileList[item], 'utf8')
    reader.onload = () => {
      if (!reader.result) return
      const result = reader.result as string
      const a = JSON.parse(result)
      if (
        a.type === 'Geometry' ||
        a.type === 'Feature' ||
        a.type === 'FeatureCollection' ||
        a.type === 'Point' ||
        a.type === 'LineString' ||
        a.type === 'Polygon' ||
        a.type === 'MultiPoint' ||
        a.type === 'MultiLineString' ||
        a.type === 'MultiPolygon' ||
        a.type === 'GeometryCollection' ||
        a.type === 'Topology'
      ) {
        geoJsonTOESObjects(xbsjEarthUi, a)
      } else if (a.sceneTree && a.asset) {
        createSceneJson(xbsjEarthUi, a)
      } else if (a.type) {
        createObj(xbsjEarthUi, a)
      } else {
        ElMessage.warning('请拖入正确的json格式')
      }
    }
    reader.onerror = () => {
      console.log('onError')
    }
  })
}

onMounted(() => {
  const { type, lastView, flyToObject, esss } = xbsjEarthUi.initConfig;

  nextTick(() => {
    if (!viewersContainer.value) return;

    // 基础 Viewer 配置
    const option: ESVOption = {
      type: 'ESCesiumViewer',
      id: 'earthui-active-viewer-id',
      container: viewersContainer.value,
      options: undefined,
    };

    /**
     * 注册一次性监听器的辅助函数
     * @param callback - 监听器回调函数
     */
    const registerOnceListener = (callback: (viewer: any) => void) => {
      const disposeFunc = xbsjEarthUi.activeViewerChanged.don((viewer) => {
        if (!viewer) {
          disposeFunc();
          return;
        };
        const disposeFunc2 = viewer.statusChanged.don((status) => {
          if (status === 'Error') {
            disposeFunc2();
            ElMessage.error('视口创建失败');
          }
          if (status === 'Created') {
            setTimeout(() => {
              callback(viewer);
            }, 2000);
            disposeFunc2();
          };
        })
        disposeFunc();
      })
    };

    //@ts-ignore
    if (window.ue && window.ue.es || esss.esssAppid && esss.esssUrl) {
      // 处理 UE Viewer 像素流模式 和大屏模式
      option.type = 'ESUeViewer';
      option.options = {
        uri: esss.esssUrl ? esss.esssUrl : window.location.origin,//大屏模式不需要所以随便
        app: esss.esssAppid ? esss.esssAppid : 'earthsdk',//大屏模式不需要所以随便
        token: esss.esssToken
      };
      registerOnceListener((viewer) => {
        if (!viewer || !(viewer instanceof ESUeViewer)) return;
        // 如果有 lastView 则回显场景，否则执行默认飞入
        if (lastView) {
          const { position, rotation } = lastView;
          viewer.flyIn(position, rotation);
          ElMessage.success('成功加载场景');
        } else {
          ElMessage.success('成功加载实例');
          viewer.defaultCameraFlyIn();
        }
      });
    } else if (type === 'ESCesiumViewer') {
      // 处理 Cesium Viewer
      // 场景回显
      if (lastView) {
        registerOnceListener((viewer) => {
          if (!viewer || !(viewer instanceof ESCesiumViewer)) return;
          const { position, rotation } = lastView;
          viewer.flyIn(position, rotation);
          ElMessage.success('成功加载场景');
        });
      }

      // 回显对象
      if (flyToObject) {
        registerOnceListener((viewer) => {
          if (!viewer || !(viewer instanceof ESCesiumViewer)) return;
          const sceneObject = xbsjEarthUi.getSceneObjectById(flyToObject);
          sceneObject && (sceneObject as ESVisualObject).flyTo();
          ElMessage.success('成功加载服务');
        });
      }
    }

    // 创建 Viewer
    const activeViewer = xbsjEarthUi.createViewer(option);
    const noonTimestamp = dayjs().hour(12).minute(0).second(0).millisecond(0).valueOf()
    activeViewer.currentTime = noonTimestamp; // 设置当前时间
  });
});
</script>
<style scoped>
.view_box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
