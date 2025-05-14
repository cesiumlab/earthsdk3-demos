### 🔥开放协作进行中！无论对象还是引擎，期待您提交PR成为的贡献之星！

# 项目介绍

- earthui 是 earthsdk 所有功能的主要展示项目源码。
- earthsdk-all-engine 是 Cesium、UE、Openlayers三个引擎互相切换的示例。
- earthsdk3-usage 是 earthsdk 所有对象的使用示例项目源码。
- earthsdk3-openlayers 是earthsdk一个自定义引擎扩展和自定义对象扩展的示例源码，使用openlayers作为渲染引擎。
- earthsdk3-html 是 earthsdk 在html中使用示例。
- earthsdk3-vite 是 earthsdk 在使用vite搭建的项目中的使用示例。
- earthsdk3-wbpk 是 earthsdk 在使用VUE CLI搭建的项目中的使用示例。

# EarthUI的使用

 - 安装依赖：在demos/earthui目录下安环依赖(npm/yarn/pnpm,注意:pnpm会为所有项目安装依赖)

```sh

yarn install

```
 - 启动：在earthui目录下运行dev (npm/yarn/pnpm)

 ```sh

yarn run dev

```
 - 构建：在earthui目录下运行build (npm/yarn/pnpm)

```sh

yarn run build

```

 - 建议：如果只启动某个项目建议采用局部安装依赖npm/yarn; 如果想要启动多个项目，建议采用pnpm来管理依赖；

```sh
//根目录
pnpm install 

//对应目录
pnpm run dev 

//对应目录
pnpm run build 

```

# monorepo

 - 启动earthsdk-all-engine需要使用pnpm来管理依赖;
 - 想要启动earthsdk-all-engine需要先安装earthsdk3-openlayers的依赖;
 - 本工程中使用monorepo来解决 earthsdk-all-engine 中 earthsdk3-openlayers 的依赖问题;
 - 运行 earthsdk-all-engine 前需要先构建 earthsdk3-openlayers;
 - 不构建 earthsdk3-openlayers也可更改 pacgage.json中 "main": "./src/index.ts";
