/**
 * 应用配置类型
 * 包含应用的基本信息、参数键名、请求地址和默认场景配置
 */
export interface ConfigType {
    /** 应用标题 */
    title: string
    /** 应用名称 */
    name: string
    /** 应用Logo（Base64编码） */
    logo: string
    /** 首页链接 */
    homeLink: string
    /** CesiumLab参数值 */
    cesiumLabParamValue: string
    /** CesiumLab url参数键名 */
    cesiumLabUrlParamKey: string
    /** CesiumLab Token参数键名 */
    cesiumLabTokenParamKey: string
    /** CesiumLab场景ID参数键名 */
    cesiumLabSceneParamKey: string
    /** ESSS参数值 */
    esssParamValue: string
    /** ESSS服务参数键名 */
    esssUrlParamKey: string
    /** ESSS实例ID参数键名 */
    esssAppIdParamKey: string
    /** ESSS场景ID参数键名 */
    esssSceneParamKey: string
    // Token参数键名
    esssTokenParamKey: string
    /** 请求URL配置 */
    requestUrls?: {
        /** 图片资源请求地址 */
        images?: string
    }
    /** 默认场景配置*/
    defaultScene: any
}
