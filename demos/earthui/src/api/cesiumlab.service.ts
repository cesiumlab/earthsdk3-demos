//images服务预览
//?from=cesiumLab
// &lang=zh-CN
// &url=xxx
// &type=images
// &name=xx
// &west=xx
// &east=120
// &south=29
// &north=30
// &minzoom=0
// &maxzoom=22
// &proj=3857
// &tiletrans=wmts
// &tilesize=256
// &cesiumLabToken=xx

import { LocalStorageKey } from "@/constants";
import { ConfigType } from "@/global/types";
import { XbsjEarthUi } from "@/scripts/xbsjEarthUi";
import { ElMessage } from "element-plus";
import { ppost } from "./http";


//terrains服务预览
//?from=cesiumLab
// &lang=zh-CN
// &url=xxlayer.json
// &type=terrains
// &name=xx
// &west=-180
// &east=180
// &south=-90
// &north=90
// &minzoom=0
// &maxzoom=16
// &cesiumLabToken=xx


//3DTileset服务预览
//?from=cesiumLab
// &lang=zh-CN
// &url=xxtileset.json
// &type=models
// &name=xxx
// &cesiumLabToken=xx


//场景
//?from=cesiumLab
// &scene=Pydd1JHs
// &cesiumLabToken=xx


/**
 * 保存场景到 CesiumLab 服务器
 * @param parseSearch - 解析后的 URL 参数
 * @param uri - 服务器地址
 */
export const saveCesiumLabScene = async (objm: XbsjEarthUi, config: ConfigType) => {
    // 解析 URL 参数
    const params = new URLSearchParams(window.location.search);
    const sceneid = params.get(config.cesiumLabSceneParamKey);

    const allJson = objm.json;
    const thumbnail = await objm.activeViewer?.capture();

    //CesiumLab服务下setItem('token')
    const token = localStorage.getItem(LocalStorageKey.CESIUMLAB_SERVER_TOKEN) as string | undefined;
    const { cesiumLabToken, cesiumLabUrl } = objm.initConfig.cesiumLab;
    const authToken = cesiumLabToken ? undefined : token;

    try {
        if (sceneid) {
            // 更新现有场景
            const params = {
                content: JSON.stringify(allJson),
                newId: sceneid,
                id: sceneid,
                thumbnail
            }

            let url = `${cesiumLabUrl}/tile/scene/update`
            if (cesiumLabToken) {
                url += `?labtoken=${cesiumLabToken}`;
            }
            await ppost(url, params, { token: authToken });

            ElMessage.success(`场景保存成功`);
        } else {
            // 创建新场景
            const params = {
                name: '新建场景',
                description: '描述',
                content: JSON.stringify(allJson),
                thumbnail
            }
            let url = `${cesiumLabUrl}/tile/scene/create`
            if (cesiumLabToken) {
                url += `?labtoken=${cesiumLabToken}`
            }
            const res = await ppost(url, params, { token: authToken });
            if (res && res.data && res.data.id) {
                const newSceneId = res.data.id;
                replaceQueryParam(config.cesiumLabSceneParamKey, newSceneId);
            }
            ElMessage.success(`场景保存成功`)
        }
    } catch (error) {
        console.error('CesiumLab 场景保存失败:', error)
        ElMessage.error(`场景保存失败`)
    }
}

export function replaceQueryParam(key: string, value: any) {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value) // 有就替换，没有就新增
    history.replaceState({}, '', url)
}
