<p align="center">
  <img src="resources/EarthSDK.png" style="width: 100%; height: auto;">
</p>

<p align="right">
  简体中文 | <a href="README.en.md">English</a> 
</p>

---

<p align="left">
  <a href="https://www.earthsdk.com/earthui/index.html">立即体验</a> •
  <a href="https://www.earthsdk.com">快速上手</a> •
  <a href="https://www.earthsdk.com/example3/index.html">示例</a> •
  <a href="https://www.earthsdk.com/docs/guide/index.html">API 文档</a> •
  <a href="https://github.com/cesiumlab/earthsdk3-demos">EarthUI 开源地址</a> 
</p>

EarthSDK 是一套基于 JS 语言的开源免费地球可视化二次开发框架，整套框架独立于引擎之外，不依赖于特定引擎，和可视化引擎互为插件，目前自带 Cesium 引擎和 Unreal Engine 、Openlayers的三种引擎实现。本身不是为了包装而封装，是为了赋能原生引擎。实现了数字孪生项目常用的所有基础功能和效果，实现了一套接口代码多引擎之间无缝切换，未来会有更多的引擎实现，例如：mapbox、unity、godot 等。

- 2019 年开始，发布 EarthSDK1，依赖 Cesium 引擎做了大量易用性扩展。
- 2022 年 11 月，我们着手开发 EarthSDK2，结合了 Cesium 引擎和 Unreal Engine 的两种引擎实现。
- 2024 年 10 月，着手升级 EarthSDK3，对开发包进行模块化拆分，用户可灵活的组合不同引擎模块。
- EarthSDK 就像一个中间件，做为可视化引擎和空间数据可视化业务之间的粘合剂。空间数据可视化业务说的更通俗点，就是传统的三维 GIS 项目，或者新兴的数字孪生园区、智慧城市等。

<p align="center">
  <img src="resources/ESObjectManager.png" style="width: 100%; height: auto; margin:20px 0">
</p>

在很长一段时间内，3D 可视化技术选型是所有做涉及三维的项目最头疼的事情，到底是传统的 CS 本地化渲染，还是使用纯 webgl 方式的页面方式，或者使用浏览器插件方式实现的渲染，这些技术各有优缺点。而且一旦选型，系统再升级和迁移的成本就很高。由于 EarthSDK 的存在，可视化项目可以基本摆脱 3D 可视化技术的选型麻烦。项目开发过程中需要一套代码，随着客户现场的软硬件运行环境或者数据保密性要求，可以采用不同的部署方式：

- EarthSDK JS + Cesium JS 实现浏览器下的 Webgl 方式的地球可视化渲染
- EarthSDK JS + Openlayers 实现浏览器下的 Webgl 方式地图可视化渲染
- EarthSDK JS + UE + ESForUE + Cesium For Unreal + ESSS 信令服务器 浏览器下像素流方式的可视化渲染
- EarthSDK JS + UE + ESForUE + Cesium For Unreal + ESWebView 实现本地部署的三维方式渲染
- EarthSDK JS + H5 实现 UE 在浏览器下以 Webgl 方式加载
- 更多...

# 开始

### 安装

- earthsdk3 是必须安装的基础包，根据业务需要和技术选型，选择是否安装 earthsdk3-cesium 、earthsdk3-ol、 earthsdk3-ue;
- 安装 earthsdk3-cesium 时需要自行[安装配置 Cesium](https://cesium.com/blog/2024/02/13/configuring-vite-or-webpack-for-cesiumjs/)
- 安装 earthsdk3-ol 时也需自行安装ol,目前内部支持版本为 ol:^7.1.0 ;

```sh
pnpm add earthsdk3 --save

# pnpm add cesium
pnpm add earthsdk3-ue --save

# pnpm add cesium
pnpm add earthsdk3-cesium --save

# pnpm add ol
pnpm add earthsdk3-ol --save
```

初始化对象管理器后即可创建引擎视口对象和场景对象，以浏览器像素流的方式创建 UE 场景需要[ESSS 信令服务器](https://www.bjxbsj.cn/esss.html)支持。

```js
import { ESObjectsManager } from "earthsdk3";
import { ESUeViewer } from "earthsdk3-ue";
import { ESCesiumViewer } from "earthsdk3-cesium";
import { ESOlViewer } from "earthsdk3-ol";
//创建对象管理
const objm = new ESObjectsManager(ESUeViewer, ESCesiumViewer, ESOlViewer);
//创建地球
const viewer = objm.createViewer({
  type: "ESCesiumViewer",
  container: "div容器或容器id",
});
```

<p align="center">
  <img src="resources/earthui.png" style="width: 100%; height: auto;">
</p>

### 直接使用

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <link
      href="https://cesium.com/downloads/cesiumjs/releases/1.123/Build/Cesium/Widgets/widgets.css"
      rel="stylesheet"
    />
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.123/Build/Cesium/Cesium.js"></script>

    <script src="js/earthsdk3.iife.js"></script>
    <script src="js/earthsdk3-cesium.iife.js"></script>
    <script src="js/earthsdk3-ue.iife.js"></script>
    <script src="js/earthsdk3-ol.iife.js"></script>
  </head>
  <script defer="defer">
    const { ESObjectsManager } = window["EarthSDK3"];
    const { ESCesiumViewer } = window["EarthSDK3_Cesium"];
    const { ESUeViewer } = window["EarthSDK3_UE"];
    const { ESOlViewer } = window["EarthSDK3_OL"];
    //创建对象管理
    const objm = new ESObjectsManager(ESUeViewer, ESCesiumViewer, ESOlViewer);
    //创建地球
    const viewer = objm.createViewer({
      type: "ESCesiumViewer",
      container: "div容器或容器id",
    });
  </script>
</html>
```

> 此开发包版权归[北京西部世界科技有限公司](https://www.bjxbsj.cn)所有。
