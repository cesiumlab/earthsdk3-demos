export * from './Icon'

export enum localStorageKey {
  //缓存基础场景的KEY，缓存在浏览器，只有一个
  Earth_UI_STORAGE_SCENE = 'Earth_UI_STORAGE_SCENE',

  //缓存cesiumlab服务地址
  Earth_UI_CESIUMLAB_SERVER_URL = "Earth_UI_CESIUMLAB_SERVER_URL",

  //缓存ESSS服务地址
  Earth_UI_ESSS_SERVER_URL = "Earth_UI_ESSS_SERVER_URL",
}
