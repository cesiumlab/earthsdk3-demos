import { gget } from '@/api'
import { localStorageKey } from '@/constants'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { getUuid } from '@/utils'
import { ElMessage } from 'element-plus'
import { inject } from 'vue'
import { ConfigType, InitSceneConfigType } from './types'

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
