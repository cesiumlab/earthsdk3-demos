export * from './Icon'

/**
 * EarthUI 本地存储的key
 */
export enum LocalStorageKey {
  /**
   * 缓存基础场景的KEY
   */
  Earth_UI_STORAGE_SCENE = 'Earth_UI_STORAGE_SCENE',

  /**
   * 缓存cesiumlab服务地址
   */
  Earth_UI_CESIUMLAB_SERVER_URL = "Earth_UI_CESIUMLAB_SERVER_URL",

  /**
   * cesiumlab服务的用户token，token的key和value都来自于cesiumlab服务
   * 这个只有在earthui作为cesiumlab附属页面使用时才需要，
   * 也就是说这个值在earthui中只能读取，不能写入
   */
  CESIUMLAB_SERVER_TOKEN = "token",

  /**
   * 缓存ESSS服务地址 
   */
  Earth_UI_ESSS_SERVER_URL = "Earth_UI_ESSS_SERVER_URL",

  /**
   * 缓存Cesium Ion访问令牌
   */
  Earth_UI_CESIUM_ION_ACCESS_TOKEN = "Earth_UI_CESIUM_ION_ACCESS_TOKEN",
  /**
   * 缓存Cesium Ion访问令牌的URL
   */
  Earth_UI_CESIUM_ION_ACCESS_URL = "Earth_UI_CESIUM_ION_ACCESS_URL",

  /**
   * 天地图token
   */
  Earth_UI_TIAN_DI_TU_TOKEN = "Earth_UI_TIAN_DI_TU_TOKEN",
  /**
   * GeoServer服务地址
   */
  Earth_UI_GEOSERVER_SERVER_URL = "Earth_UI_GEOSERVER_SERVER_URL",
}
