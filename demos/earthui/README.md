# demo1

## 准备工作
推荐使用node 14版本，其他版本不保证没问题。  
然后需要全局安装ncp, rimraf 执行以下命令：  
npm i -g ncp rimraf。

## Project setup
```
yarn ii
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 问题
*. 如果yarn ii执行以后没反应，有可能是资源下载过慢，可以使用淘宝金镜像，执行以下这一句就好。  
npm config set registry https://registry.npm.taobao.org  
