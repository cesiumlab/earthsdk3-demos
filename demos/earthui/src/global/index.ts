import { gget } from '@/api'
import { localStorageKey } from '@/constants'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { getUuid } from '@/utils'
import { ElMessage } from 'element-plus'
import { inject } from 'vue'
import { ConfigType, InitSceneConfigType } from './types'

/** 全局配置信息 */
export const $config = {
  // title: 'EarthSDK地球可视化开发包-免费开源',
  logoTitle: 'EarthSDK 三维地球开发包',
  logoImage: new URL('../assets/logo.png', import.meta.url).href,
  modelShow: true,
  localserverName: 'CesiumLab4',
  logoLink: 'http://bjxbsj.cn/',
  jumpOrigin: 'cesiumLab',
  jumpToken: 'cesiumLabToken',



  title: 'EarthSDK地球可视化开发包-免费开源',
  name: 'EarthSDK 三维地球开发包',
  logo: 'data:image/png;base64,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',
  homeLink: "http://bjxbsj.cn/",
  cesiumLabParamKey: "cesiumLab",
  cesiumLabTokenParamKey: "cesiumLabToken",
  esssParamKey: "esss",
  esssSceneidParamKey: "ESSSsceneid"
}

export const $g_config = () => inject<ConfigType>('earthui-config')!;

export const $g_objm = () => inject<XbsjEarthUi>('xbsjEarthUi')!;


/**
 * 初始化场景 JSON 配置，场景id请求转换为场景json,数据服务也规整到初始化场景中；
 * @param gconfig - 全局配置对象
 * @returns  1. 初始化场景json；2.创建什么视口；
 */
export async function initSceneJson(gconfig: ConfigType): Promise<InitSceneConfigType> {
  const {
    cesiumLabParamValue,
    cesiumLabUrlParamKey,
    cesiumLabSceneParamKey,
    cesiumLabTokenParamKey,
    esssParamValue,
    esssUrlParamKey,
    esssAppIdParamKey,
    esssSceneParamKey,
    esssTokenParamKey,
    defaultScene
  } = gconfig;

  // 解析 URL 参数
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');

  // CesiumLab 相关参数
  const labScene = params.get(cesiumLabSceneParamKey);
  const cesiumLabUrl = params.get(cesiumLabUrlParamKey)
    ?? window.localStorage.getItem(localStorageKey.Earth_UI_CESIUMLAB_SERVER_URL)
    ?? window.location.origin;
  const cesiumLabToken = params.get(cesiumLabTokenParamKey) ?? undefined;

  const serverType = params.get('type');
  const paramsUrl = params.get('url');

  // ESSS 相关参数
  const esssScene = params.get(esssSceneParamKey);
  const esssAppid = params.get(esssAppIdParamKey) ?? undefined;
  const esssUrl = params.get(esssUrlParamKey)
    ?? window.localStorage.getItem(localStorageKey.Earth_UI_ESSS_SERVER_URL)
    ?? window.location.origin;
  const esssToken = params.get(esssTokenParamKey) ?? undefined;

  // if (parseSearch.czmlabPath) {
  //   xbsjEarthUi.czmlabPath = parseSearch.czmlabPath as string
  //   console.log('czmlab-path:', xbsjEarthUi.czmlabPath)
  // }
  // if (parseSearch.cesiumLabUrl) {
  //   xbsjEarthUi.cesiumLabUrl = parseSearch.cesiumLabUrl as string
  //   // console.log('cesiumLabUrl:', xbsjEarthUi.cesiumLabUrl);
  // }
  // if (parseSearch[$config.jumpToken]) {
  //   xbsjEarthUi.cesiumLabToken = parseSearch[$config.jumpToken] as string
  //   // console.log('cesiumLabToken:', xbsjEarthUi.cesiumLabToken);
  // }
  // if (parseSearch.cesiumLabToken) {
  //   xbsjEarthUi.cesiumLabToken = parseSearch.cesiumLabToken as string
  //   // console.log('cesiumLabToken:', xbsjEarthUi.cesiumLabToken);
  // }

  //存储 cesiumLabUrl,esssUrl 到 localStorage
  window.localStorage.setItem(localStorageKey.Earth_UI_CESIUMLAB_SERVER_URL, cesiumLabUrl);
  window.localStorage.setItem(localStorageKey.Earth_UI_ESSS_SERVER_URL, esssUrl);

  // 此 cesiumlab 服务下存的 token，当 earthui 嵌入 lab 后该页面下的接口调用需要
  const token = localStorage.getItem(localStorageKey.CESIUMLAB_SERVER_TOKEN) as string | undefined;

  // 构建基础配置对象
  const createConfig = (overrides = {}) => ({
    scene: defaultScene,
    type: "ESCesiumViewer" as const,
    cesiumLab: {
      cesiumLabUrl,
      cesiumLabToken
    },
    esss: {
      esssAppid,
      esssUrl,
      esssToken
    },
    lastView: undefined,
    flyToObject: undefined as string | undefined,
    ...overrides
  });

  try {
    // 如果没有指定来源，返回默认配置
    if (!from) {
      return createConfig();
    }

    const fromCesiumLab = from === cesiumLabParamValue;
    const fromEsss = from === esssParamValue;

    // 处理 CesiumLab 场景回显
    if (fromCesiumLab && labScene) {
      const url = `${cesiumLabUrl}/tile/scene?id=${labScene}${cesiumLabToken ? `&labtoken=${cesiumLabToken}` : ''}`;
      // cesiumLabToken 优先级大于 token
      const res = await gget(url, { token: cesiumLabToken ? undefined : token });
      const json = JSON.parse(res.data.content);
      return createConfig({
        scene: json,
        lastView: json.lastView,
        flyToObject: undefined,
        type: "ESCesiumViewer"
      });
    }

    // 处理数据服务加载
    if (serverType && paramsUrl) {
      const serverJson = getSceneObjectJsonFromParams(cesiumLabToken);
      if (serverJson) {
        const treeItemJson = {
          "name": serverJson.name,
          "sceneObj": serverJson,
          "children": []
        }

        defaultScene.sceneTree.root.children.push(treeItemJson);
        return createConfig({
          scene: defaultScene,
          lastView: undefined,
          flyToObject: serverJson.id,
          type: "ESCesiumViewer"
        });
      }
    }

    // 处理 UE 场景回显
    if (fromEsss && esssScene && esssAppid) {
      const res = await gget(`${esssUrl}/staticscene/get?id=${esssScene}`, { token: esssToken! });
      //esss初始化场景时不存在content信息，所以需要判断，第一次保存后就可以了
      //所以会出现有esssSceneid，但是没有场景数据的情况
      const json = res?.data?.content;
      return createConfig({
        scene: json ?? defaultScene,
        lastView: json?.lastView,
        flyToObject: undefined,
        type: "ESUeViewer"
      });
    }

    // 处理 UE 实例预览
    if (fromEsss && esssAppid) {
      return createConfig({
        scene: defaultScene,
        type: "ESUeViewer",
        lastView: undefined,
        flyToObject: undefined
      });
    }

    // 默认返回基础配置
    return createConfig();

  } catch (error) {
    console.error('初始化场景失败，使用默认场景', error);
    ElMessage({
      message: '初始化场景失败，使用默认场景',
      type: 'warning',
      plain: true,
      offset: 100
    })
    return createConfig();
  }
}


/**
 * 从URL参数中提取场景对象配置信息并生成对应的JSON配置对象
 * @param {string} [labtoken] - 可选的CesiumLab服务认证令牌
 * @returns {Object|null} 返回包含场景对象配置的JSON对象，支持以下类型：
 *   - ESImageryLayer: 影像图层配置
 *   - ESTerrainLayer: 地形图层配置
 *   - ES3DTileset: 三维瓦片配置
 *   - ESMVTLayer: 矢量瓦片配置
 *   若参数不完整则返回null
 * 
 * 支持的URL参数包括：
 *   - type: 服务类型(images/terrains/models/vecImages)
 *   - west/south/east/north: 范围坐标(默认-180,-90,180,90)
 *   - url: 服务地址
 *   - tiletrans: 瓦片类型(tms/xyz)
 *   - proj: 投影类型(4326/WebMercator)
 *   - name: 图层名称
 *   - minzoom/maxzoom: 最小/最大缩放级别
 */
/**
 * 从 URL 参数中获取场景对象的 JSON 配置
 * @param labtoken - CesiumLab 服务的认证令牌（可选）
 * @returns 场景对象的 JSON 配置，如果参数不完整则返回 null
 */
export function getSceneObjectJsonFromParams(labtoken?: string) {
  const params = new URLSearchParams(window.location.search);

  const id = getUuid(); // 生成一个唯一的ID

  const serverType = params.get('type');
  const paramsUrl = params.get('url');

  // 如果缺少必要参数，直接返回 null
  if (!serverType || !paramsUrl) return null;

  // 提取通用参数
  const west = params.get('west') ?? '-180';
  const south = params.get('south') ?? '-90';
  const east = params.get('east') ?? '180';
  const north = params.get('north') ?? '90';
  const rectangle = [+west, +south, +east, +north];
  const name = params.get('name') ?? serverType + '服务';

  /**
   * 构建带认证的 URL 对象
   * @param url - 原始 URL
   * @returns 如果有 labtoken 则返回带 headers 的对象，否则返回原始 URL
   */
  const buildAuthUrl = (url: string) => {
    return labtoken
      ? { url, headers: { labtoken } }
      : url;
  };

  // 根据不同的服务类型构建配置对象
  switch (serverType) {
    case 'images': {
      // 影像图层配置
      const tiletrans = params.get('tiletrans');
      const proj = params.get('proj');
      const minzoom = params.get('minzoom');
      const maxzoom = params.get('maxzoom');

      const czmTilingScheme = proj === '4326'
        ? 'GeographicTilingScheme'
        : 'WebMercatorTilingScheme';

      const url = tiletrans === 'tms'
        ? `${paramsUrl}/tilemapresource.xml`
        : paramsUrl;

      return {
        id,
        type: 'ESImageryLayer',
        url: buildAuthUrl(url),
        rectangle,
        allowPicking: true,
        name,
        minimumLevel: minzoom,
        maximumLevel: maxzoom,
        zIndex: 1,
        options: {
          type: tiletrans === 'tms' ? 'tms' : 'xyz',
          tilingScheme: { type: czmTilingScheme }
        }
      };
    }

    case 'terrains': {
      // 地形图层配置
      return {
        id,
        type: 'ESTerrainLayer',
        url: buildAuthUrl(paramsUrl),
        rectangle,
        name
      };
    }

    case 'models': {
      // 3D 模型图层配置
      return {
        id,
        type: 'ES3DTileset',
        url: buildAuthUrl(paramsUrl),
        name
      };
    }

    case 'vecImages': {
      // 矢量图层配置（不需要认证）
      return {
        id,
        type: 'ESMVTLayer',
        url: paramsUrl,
        rectangle,
        name
      };
    }

    default:
      // 未知的服务类型
      return null;
  }
}


// const getdefaultImage = (xbsjEarthUi: XbsjEarthUi) => {
//   if (hasCreatedImagery) return // 防止重复创建
//   hasCreatedImagery = true
//   getNoToken(`https://account.bjxbsj.cn/api/bjxbsj/online/default`)
//     .then((res: any) => {
//       if (res && res.url) {
//         xbsjEarthUi.sceneTree.createSceneObjectTreeItemFromJson({
//           type: 'ESImageryLayer',
//           url: res.url,
//           name: '全球影像',
//           maximumLevel: 18
//         })
//       } else {
//         xbsjEarthUi.sceneTree.createSceneObjectTreeItemFromJson({
//           type: 'ESImageryLayer',
//           url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//           name: '全球影像',
//           maximumLevel: 18
//         })
//       }
//     })
//     .catch((error: any) => {
//       xbsjEarthUi.sceneTree.createSceneObjectTreeItemFromJson({
//         type: 'ESImageryLayer',
//         url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//         name: '全球影像',
//         maximumLevel: 18
//       })
//       console.log(error)
//     })
// }
