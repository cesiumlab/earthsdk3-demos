<template>
  <div class="view_box" ref="viewersContainer" id="viewersContainer" @dragenter="dragEnter($event)"
    @dragleave="dragLeave($event)" @dragover="dragOver($event)" @drop="dropFile($event)"></div>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESVOptionUe } from "earthsdk3";
import { inject, onMounted, shallowRef } from "vue";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import {
  createObj,
  createSceneJson,
  geoJsonTOESObjects,
} from "../sceneTree/tools";
const viewersContainer = shallowRef<HTMLDivElement>();
const xbsjEarthUi = inject("xbsjEarthUi") as XbsjEarthUi;

const dragEnter = (event: Event) => {
  event.preventDefault();
};
const dragLeave = (event: Event) => {
  event.preventDefault();
};
const dragOver = (event: Event) => {
  event.preventDefault();
};
const dropFile = async (event: Event) => {
  event.preventDefault();

  //@ts-ignore
  let fileList = event.dataTransfer.files;
  Object.keys(fileList).forEach((item) => {
    const reader = new FileReader();
    reader.readAsText(fileList[item], "utf8");
    reader.onload = () => {
      if (!reader.result) return;
      const result = reader.result as string;
      const a = JSON.parse(result);
      if (
        a.type === "Geometry" ||
        a.type === "Feature" ||
        a.type === "FeatureCollection" ||
        a.type === "Point" ||
        a.type === "LineString" ||
        a.type === "Polygon" ||
        a.type === "MultiPoint" ||
        a.type === "MultiLineString" ||
        a.type === "MultiPolygon" ||
        a.type === "GeometryCollection" ||
        a.type === "Topology"
      ) {
        geoJsonTOESObjects(xbsjEarthUi, a);
      } else if (a.sceneTree && a.asset) {
        createSceneJson(xbsjEarthUi, a);
      } else if (a.type) {
        createObj(xbsjEarthUi, a);
      } else {
        Message.warning("请拖入正确的json格式");
      }
    };
    reader.onerror = () => {
      console.log("onError");
    };
  });
};

onMounted(() => {
  // const options = {
  //     domid: 'viewersContainer',
  //     uri: 'http://localhost:8086/',
  //     app: '0108',
  // }
  // xbsjEarthUi.createUEViewer(options);
  let viewer;
  //@ts-ignore
  if (window.ue && window.ue.es) {
    // const options = {
    //     domid: 'viewersContainer',
    //     uri: '',
    //     app: '',
    // }
    const options = {
      type: "ESUeViewer",
      container: "viewersContainer",
      options: {
        uri: "",
        app: "",
      },
    } as ESVOptionUe;
    viewer = xbsjEarthUi.createUeViewer(options);
  } else {
    if (viewersContainer.value) {
      viewer = xbsjEarthUi.createCesiumViewer(viewersContainer.value);
    }
  }
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
