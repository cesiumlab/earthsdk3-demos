<template>
  <div class="box">

    <div class="btn-box">
      <botton @click="switchViewer('cesium')">切换为Cesium</botton>
      <botton @click="switchViewer('ue')">切换为UE</botton>
      <botton @click="switchViewer('openlayers')">切换为Openlayers</botton>
    </div>

    <!-- 视口容器 -->
    <div class="container" ref="container"></div>

  </div>

</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { getobjm } from '../scripts/getobjm';
import { ESVOption } from 'earthsdk3';

const objm = getobjm();
const container = ref<HTMLDivElement>();

nextTick(() => {
  if (!container.value) return;
  //创建视口
  const viewer = objm.createCesiumViewer(container.value);
  console.log(viewer);
})


type ViewerType = 'cesium' | 'ue' | 'openlayers';
//切换视口
const switchViewer = (type: ViewerType) => {
  if (!container.value) return;

  let option: ESVOption = { type: 'ESCesiumViewer', container: container.value }

  if (type === 'ue') {
    //需要配置ESSS信令服务器 https://bjxbsj.cn/esss.html
    option = {
      type: 'ESUeViewer', container: container.value,
      options: {
        uri: 'http://localhost:9007/',
        app: 'earthsdk3'
      }
    };

  } else if (type === 'openlayers') {

    option = { type: 'ESOlViewer', container: container.value };
  }

  //切换cesium/ue/openlayers视口
  objm.switchViewer(option);
}

</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.btn-box {
  height: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
}

botton {
  padding: 0 10px;
  height: 30px;
  margin: 10px;
  background-color: #01fa7d8c;
  border: 1px solid #01fa7d8c;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
</style>
