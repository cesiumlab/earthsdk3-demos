### 期待大家的更多引擎的参与贡献。

本工程使用monorepo来解决各个包之间的依赖关系、版本冲突、同步开发等问题,需使用pnpm来管理依赖;
```sh
npm install pnpm -g
```

# 项目介绍
- earthui 是 earthsdk 所有功能的主要展示项目源码。
- earthsdk3-usage 是 earthsdk 所有对象的使用示例项目源码。
- earthsdk3-openlayers 是earthsdk一个自定义引擎扩展和自定义对象扩展的示例源码，使用openlayers作为渲染引擎。
- earthsdk3-html 是 earthsdk 在html中使用示例。
- earthsdk3-vite 是 earthsdk 在使用vite搭建的项目中的使用示例。
- earthsdk3-wbpk 是 earthsdk 在使用VUE CLI搭建的项目中的使用示例。

# EarthUI 启动
 - 依赖安装 根目录下运行
```sh
pnpm install
```

 - 启动 earthui目录下运行
 ```sh
pnpm run dev
```
