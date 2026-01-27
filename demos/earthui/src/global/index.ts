import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { inject, ref } from 'vue'
import { ConfigType } from './types'
import { localStorageKey } from '@/constants'
import { gget } from '@/api'
/** 右侧边栏宽度 */
const rightSidebarWidth = ref(400)
export const useRightSidebarWidthFunc = () => {
  function setRightSidebarWidth(width: number) {
    rightSidebarWidth.value = width
  }
  return {
    rightSidebarWidth,
    setRightSidebarWidth
  }
}

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


export async function initSceneJson(gconfig: ConfigType) {
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

  const search = window.location.search.substring(1)
  const params = new URLSearchParams(search);

  const from = params.get('from');


  const labScene = params.get(cesiumLabSceneParamKey);
  const cesiumLabUrl = params.get(cesiumLabUrlParamKey) ?? window.localStorage.getItem(localStorageKey.Earth_UI_CESIUMLAB_SERVER_URL) ?? window.location.origin;
  const cesiumLabToken = params.get(cesiumLabTokenParamKey) ?? undefined;

  const esssScene = params.get(esssSceneParamKey);
  const esssAppid = params.get(esssAppIdParamKey);
  const esssUrl = params.get(esssUrlParamKey) ?? window.location.origin;
  const esssToken = params.get(esssTokenParamKey);

  //此cesiumlab服务下存的token,当earthui嵌入lab后该页面下的接口调用需要
  const token = localStorage.getItem('token') as string | undefined

  const config = {
    scene: defaultScene,
    type: "ESCesiumViewer",
    cesiumLab: {
      cesiumLabUrl,
      cesiumLabToken
    },
    esss: {
      appid: esssAppid,
      esssUrl: esssUrl
    },
    lastView: undefined,

  }

  try {
    if (from) {
      const fromCesiumLab = (from === cesiumLabParamValue);
      const fromEsss = (from === esssParamValue);

      //cesiumLab场景回显
      if (fromCesiumLab && labScene) {
        let url = `${cesiumLabUrl}/tile/scene?id=${labScene}`
        if (cesiumLabToken) {
          url += `&labtoken=${cesiumLabToken}`
        }
        //cesiumLabToken优先级大于token
        const res = await gget(url, { token: cesiumLabToken ? undefined : token });
        const json = JSON.parse(res.data.content);
        config.scene = json;
        config.lastView = json.lastView;
        config.type = "ESCesiumViewer";
        return config
      }

      //ue场景回显
      if (fromEsss && esssScene && esssAppid) {
        // const res = await gget(`${esssUrl}/setting/get`, { token: esssToken ?? undefined });
        const res = await gget(`${esssUrl}/staticscene/get?id=${esssScene}`, { token: esssToken! });
        const json = res.data.content;
        console.log('ue 场景', json);
        config.scene = json;
        config.lastView = json.lastView;
        config.type = "ESUeViewer";
        return config
      }

      //ue实例预览
      if (fromEsss && esssAppid) {
        config.scene = defaultScene;
        config.type = "ESUeViewer";
        config.lastView = undefined;
        return config
      }

    }
    return config
  } catch (error) {
    console.error('初始化场景失败，使用默认场景', error)
    return config;
  }
}
