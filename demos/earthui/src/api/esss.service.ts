//实例预览
// ?from=esss
// &appid=xxx
// &name=xxx
// &token=xxx

import { $g_config, $g_objm } from "@/global";
import { ElMessage } from "element-plus";
import { ppost } from "./http";
import { XbsjEarthUi } from "@/scripts/xbsjEarthUi";
import { ConfigType } from "@/global/types";


//场景
// ?from=esss
// &ESSSsceneid=xxx
// &appid=xxx
// &name=xxx
// &token=xxx

/**
 * 保存场景到 ESSS 服务器
 * @param parseSearch - 解析后的 URL 参数
 * @param uri - 服务器地址
 */
export const saveEsssScene = async (objm: XbsjEarthUi, config: ConfigType) => {

    // 解析 URL 参数
    const params = new URLSearchParams(window.location.search);
    const sceneid = params.get(config.esssSceneParamKey);

    const { esssUrl, esssAppid, esssToken } = objm.initConfig.esss;

    const allJson = objm.json;

    if (!esssAppid) {
        ElMessage.error('场景保存失败,缺少 appid 参数');
        return
    }

    try {
        if (!sceneid) {
            // 创建新场景
            const thumbnail = await objm.activeViewer?.capture();
            const url = `${esssUrl}/staticscene/create`;
            const param = {
                name: '默认场景',
                appid: esssAppid,
                thumbnail,
                content: JSON.stringify(allJson)
            }
            await ppost(url, param, { token: esssToken });
            ElMessage.success(`场景保存成功`);
        } else {
            // 更新现有场景
            const url = `${esssUrl}/staticscene/update`
            const param = {
                id: sceneid,
                content: JSON.stringify(allJson)
            }
            await ppost(url, param, { token: esssToken });
            ElMessage.success(`场景保存成功`);
        }
    } catch (error) {
        console.error('ESSS 场景保存失败:', error)
        ElMessage.error(`场景保存失败`);
        // 降级处理：使用 PUT 方法
        // try {
        //     if (sceneid) {
        //         const uri = `${esssUrl}/staticscene/${sceneid}`
        //         await pput(`${uri}/staticscene/${sceneid}`, { content: allJson }, { token })
        //         ElMessage.success(`场景保存成功：${sceneid}`);
        //     } else {
        //         ElMessage.error(`场景保存失败`);
        //     }
        // } catch (putError) {
        //     console.error('PUT 请求失败:', putError);
        //     ElMessage.error(`场景保存失败`);
        // }
    }
}
