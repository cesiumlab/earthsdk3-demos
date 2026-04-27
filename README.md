# EarthSDK 3

<p align="center">
  <img src="resources/EarthSDK.png" alt="EarthSDK" style="width: 100%; max-width: 900px;">
</p>

<p align="center">
  <a href="https://www.earthsdk.com/earthui/index.html">立即体验</a> •
  <a href="https://www.earthsdk.com">快速上手</a> •
  <a href="https://www.earthsdk.com/example3/index.html">示例中心</a> •
  <a href="https://www.earthsdk.com/docs/index.html">API 文档</a> •
  <a href="https://github.com/cesiumlab/earthsdk3-demos">EarthUI 开源地址</a>
</p>

<p align="center">
  简体中文 | <a href="README.en.md">English</a>
</p>

---

## 简介

EarthSDK 是一套基于 **JavaScript/TypeScript** 的开源免费三维地球可视化二次开发框架。整套框架**独立于渲染引擎之外**，不依赖特定引擎，与可视化引擎互为插件。它不是简单的封装层，而是**赋能原生引擎**，实现了数字孪生项目所需的全部基础功能和效果，并支持**一套代码多引擎无缝切换**。

EarthSDK 最初于 2019 年发布，经历多次重大迭代：

| 时间          | 版本       | 说明                                      |
| ------------- | ---------- | ----------------------------------------- |
| 2019 年       | EarthSDK 1 | 依赖 Cesium 引擎，提供大量易用性扩展      |
| 2022 年 11 月 | EarthSDK 2 | 整合 Cesium 与 Unreal Engine 两种引擎实现 |
| 2024 年 10 月 | EarthSDK 3 | 模块化拆分，支持灵活组合不同引擎模块      |

<video src="resources/czm_ue_ol.mp4" controls width="100%">
</video>

## 核心特性

### 多引擎支持

EarthSDK 3 目前支持以下渲染引擎,多引擎秒切换,未来还将扩展更多：

| 引擎              | 包名               | 说明                            |
| ----------------- | ------------------ | ------------------------------- |
| **Cesium JS**     | `earthsdk3-cesium` | 浏览器端 WebGL 地球可视化渲染   |
| **Unreal Engine** | `earthsdk3-ue`     | 本地/云端高质量渲染，支持像素流 |
| **OpenLayers**    | `earthsdk3-ol`     | 二维地图可视化渲染              |
| **H5 WebGL**      | `earthsdk3-h5`     | UE 在浏览器中以 WebGL 方式运行  |

### 丰富的场景对象

EarthSDK 3 内置 **100+ 种场景对象**，涵盖数字孪生各类应用场景：

- **数据加载**: 3DTileset、glTF 模型、影像图层、地形图层、矢量数据等
- **地理矢量**: GeoJSON、多边形、线串、矩形、拉伸多边形、贝塞尔曲线等
- **分析工具**: 视域分析、日照分析、淹没分析、控高分析、天际线分析、体积测量等
- **测量工具**: 距离测量、面积测量、高度测量、方向测量、位置测量等
- **特效对象**: 动态水面、爆炸粒子、火焰粒子、高斯溅射等
- **可视化**: POI、文本标签、图片标签、热力图、聚合图层等
- **地形编辑**: 挖掘、裁剪平面、盒子裁剪等

### 多样化部署方式

EarthSDK 3 支持根据项目需求灵活选择部署模式：

| 部署方式       | 技术栈                            | 适用场景                       |
| -------------- | --------------------------------- | ------------------------------ |
| **WebGL 渲染** | EarthSDK JS + Cesium JS           | 纯浏览器端渲染，零部署         |
| **像素流渲染** | EarthSDK JS + UE + ESForUE + ESSS | 云渲染，高画质，支持大规模场景 |
| **本地大屏**   | EarthSDK JS + UE + ESWebView      | 本地部署，低延迟，高画质       |
| **H5 模式**    | EarthSDK JS + H5                  | UE 以 WebGL 方式在浏览器运行   |

<p align="center">
  <img src="resources/ESObjectManager.png" alt="ESObjectsManager" style="width: 100%; max-width: 900px; margin: 20px 0">
</p>

### 响应式架构

- 基于 TypeScript 构建，提供完整的类型安全
- 内置响应式变量系统，支持数据绑定和变更通知
- 所有对象支持 JSON 序列化/反序列化
- 组件化设计模式，模块职责清晰

---

## 安装

### 环境要求

- Node.js >= 18
- pnpm / npm / yarn

### 安装 EarthSDK 核心包

```sh
# 安装核心
pnpm add earthsdk3 --save

```

### 按需安装引擎包

EarthSDK 核心包是必装的，引擎包可根据业务需求选择：

```sh
# Cesium 引擎（必选其一）
pnpm add earthsdk3-cesium --save

# Unreal Engine 引擎
pnpm add earthsdk3-ue --save

# OpenLayers 引擎
pnpm add earthsdk3-ol --save
```

> 安装 `earthsdk3-cesium` 时需要额外安装[配置 Cesium](https://cesium.com/blog/2024/02/13/configuring-vite-or-webpack-for-cesiumjs/)。安装 `earthsdk3-ol` 时需要额外安装 `ol`（当前支持版本 `^7.1.0`）。

---

## 快速开始

### 初始化对象管理器

创建 `ESObjectsManager` 对象管理器，通过泛型参数注册需要使用的引擎：

```typescript
import { ESObjectsManager } from "earthsdk3";
import { ESCesiumViewer } from "earthsdk3-cesium";
import { ESUeViewer } from "earthsdk3-ue";
import { ESOlViewer } from "earthsdk3-ol";

// 创建对象管理器，同时注册多个引擎
const objm = new ESObjectsManager(ESCesiumViewer, ESUeViewer, ESOlViewer);

// 创建 Cesium 视口
const viewer = objm.createViewer({
  type: "ESCesiumViewer",
  container: "container-id-or-element",
});

//创建一个基础影像图层
const imageryLayer = objm.createSceneObjectFromJson({
  id: "94f8b01b-8659-4a34-942b-15e6ece246ca",
  type: "ESImageryLayer",
  name: "全球影像",
  url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  maximumLevel: 18,
});
```

<p align="center">
  <img src="resources/EarthUI.png" alt="EarthUI Demo" style="width: 100%; max-width: 900px;">
</p>

### 直接使用

如不方便使用构建工具，可通过 IIFE 方式直接引入：

```html
<!DOCTYPE html>
<html lang="zh-CN">
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
  <body>
    <div id="viewerContainer"></div>
    <script>
      const { ESObjectsManager } = window["EarthSDK3"];
      const { ESCesiumViewer } = window["EarthSDK3_Cesium"];
      const { ESUeViewer } = window["EarthSDK3_UE"];
      const { ESOlViewer } = window["EarthSDK3_OL"];

      // 创建对象管理器
      const objm = new ESObjectsManager();

      // 创建视口
      const viewer = objm.createViewer({
        type: "ESCesiumViewer",
        container: "viewerContainer",
      });

      //创建一个基础影像图层
      const imageryLayer = objm.createSceneObjectFromJson({
        id: "94f8b01b-8659-4a34-942b-15e6ece246ca",
        type: "ESImageryLayer",
        name: "全球影像",
        url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maximumLevel: 18,
      });
    </script>
  </body>
</html>
```

---

## 核心 API

### ESObjectsManager

对象管理器，负责管理所有场景对象和视口实例，以下列出一部分。

| 方法                                                        | 说明                     |
| ----------------------------------------------------------- | ------------------------ |
| `createViewer(option)`                                      | 创建视口实例             |
| `createSceneObject(type, id?)`                              | 创建场景对象             |
| `getSceneObject(option?)`                                   | 按类型或 ID 获取场景对象 |
| `destroySceneObject(obj)`                                   | 销毁场景对象             |
| `switchViewer(option, viewSync?, attributeSync?, destroy?)` | 切换视口                 |
| `createCesiumViewer(params)`                                | 创建 Cesium 视口         |
| `createOpenLayersViewer(params)`                            | 创建 OpenLayers 视口     |
| `createUeViewer(params)`                                    | 创建 UE 视口             |

### ESViewer

视口基类，定义统一的视口操作接口，以下列出一部分。

| 方法                                                  | 说明               |
| ----------------------------------------------------- | ------------------ |
| `flyTo(flyToParam, position, flyMode?)`               | 飞行到目标位置     |
| `flyIn(position, rotation?, duration?, flyMode?)`     | 飞入动画           |
| `pick(screenPosition)`                                | 拾取对象           |
| `pickPosition(screenPosition)`                        | 获取地面坐标       |
| `changeToWalk(position, jumpZVelocity?, eyeHeight?)`  | 切换到步行模式     |
| `changeToMap()`                                       | 切换到地图模式     |
| `changeToRotateGlobe(latitude?, height?, cycleTime?)` | 切换到旋转地球模式 |
| `capture(resx?, resy?)`                               | 捕获视口图像       |

---

## 开发指南

### 环境搭建

```sh
# 克隆仓库
git clone https://github.com/cesiumlab/earthsdk3-code.git

# 安装依赖
pnpm install

# 切换调试/构建模式
node change-mode.js debug   # main 指向源码

# 启动开发模式
pnpm run dev-app1
```

### 构建

```sh
# 切换调试/构建模式
node change-mode.js build  # main 指向发布产物

# 构建所有包
pnpm run build-earthsdk3
pnpm run build-earthsdk3-cesium
pnpm run build-earthsdk3-ue
pnpm run build-earthsdk3-ol
```

---

## 许可证

本开发包版权归 [北京西部世界科技有限公司](https://www.bjxbsj.cn) 所有。

基于 [ISC 许可证](resources/LICENSE) 开源。

---

## 社区与支持

- 🌐 官方网站: [www.earthsdk.com](https://www.earthsdk.com)
- 🌏 公众号: 地球可视化实验室
- 🌐 公司官网: [北京西部世界科技有限公司](https://www.bjxbsj.cn)
- 🌐 CesiumLab 地理信息基础数据处理平台: [CesiumLab](https://www.bjxbsj.cn/cesiumlab.html)
- 🌐 PipeSer 管线管网云服务: [PipeSer](https://www.bjxbsj.cn/pipeser.html)
- 🌐 ModelSer 实景三维数据分布式管理平台: [ModelSer](https://www.bjxbsj.cn/modelser.html)
- 🌐 CIMRTS 城市信息模型数据服务平台: [CIMRTS](https://www.bjxbsj.cn/cimrts.html)
- 🌐 TerrainRTS 地形高程数据实时切片服务平台: [CIMRTS](https://www.bjxbsj.cn/terrainrts.html)

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://www.bjxbsj.cn">北京西部世界科技有限公司</a></strong>
</p>
