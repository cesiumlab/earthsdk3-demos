# 介绍

- earthui 是 earthsdk 所有功能的主要展示项目源码。
- earthsdk-all-engine 是 Cesium、UE、Openlayers 三个引擎互相切换的示例。
- earthsdk3-usage 是 earthsdk 所有对象的使用示例项目源码。
- earthsdk3-openlayers 是 earthsdk 一个自定义引擎扩展和自定义对象扩展的示例源码，使用 openlayers 作为渲染引擎。
- earthsdk3-html 是 earthsdk 在 html 中使用示例。
- earthsdk3-vite 是 earthsdk 在使用 vite+vue 搭建的项目中的使用示例。
- earthsdk3-react-vite 是 earthsdk 在使用 vite+react 搭建的项目中的使用示例。
- earthsdk3-wbpk 是 earthsdk 在使用 VUE CLI 搭建的项目中的使用示例。
- 启动 earthsdk-all-engine 需要使用 pnpm 来管理依赖;
- 想要启动 earthsdk-all-engine 需要先安装 earthsdk3-openlayers 的依赖;
- 本工程中使用 monorepo 来解决 earthsdk-all-engine 中 earthsdk3-openlayers 的依赖问题;
- 运行 earthsdk-all-engine 前需要先构建 earthsdk3-openlayers;
- 不构建 earthsdk3-openlayers 也可更改 pacgage.json 中 "main": "./src/index.ts";

# 使用

> 建议：如果只启动某个项目建议采用局部安装依赖 npm/yarn; 如果想要启动多个项目，建议采用 pnpm 来管理依赖；

```sh
pnpm install

//对应目录下
pnpm run dev

//对应目录下
pnpm run build
```
