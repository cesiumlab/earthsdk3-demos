/**
 * HTTP客户端封装
 * 基于axios实现的简单HTTP请求封装，支持GET、POST、PUT等方法
 * @module client
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

/**
 * HTTP响应数据接口
 * @template T - 响应数据类型
 */
export interface HttpResponse<T = any> {
    /** 响应数据 */
    data: T
    /** 状态码 */
    code: number
    /** 响应消息 */
    message: string
}

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
    /** 认证令牌 */
    token?: string
    /** 是否使用Bearer令牌格式 */
    useBearer?: boolean
}

/**
 * HTTP客户端类
 * 提供统一的HTTP请求方法和错误处理
 */
class HttpClient {
    /** axios实例 */
    private instance: AxiosInstance

    /**
     * 构造函数
     * @param baseURL - 基础URL
     * @param timeout - 超时时间（毫秒）
     */
    constructor(baseURL: string = '', timeout: number = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // 请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response.data
            },
            (error: AxiosError) => {
                const err = this.handleError(error);
                const msg = err.message || '请求失败，请检查';
                ElMessage({
                    message: msg,
                    type: 'error',
                    plain: true,
                    offset: 100
                })
                return Promise.reject(err);
            }
        )
    }

    /**
     * HTTP错误类型枚举
     */
    private readonly ERROR_TYPES = {
        NETWORK: 'NETWORK_ERROR',
        TIMEOUT: 'TIMEOUT_ERROR',
        CANCEL: 'CANCEL_ERROR',
        SERVER: 'SERVER_ERROR',
        CLIENT: 'CLIENT_ERROR',
        UNKNOWN: 'UNKNOWN_ERROR'
    } as const

    /**
     * HTTP状态码错误消息映射表
     */
    private readonly STATUS_ERROR_MAP: Record<number, string> = {
        // 4xx 客户端错误
        400: '请求参数错误，请检查请求数据格式',
        401: '身份验证失败，请重新登录',
        403: '没有权限访问该资源',
        404: '请求的资源不存在',
        405: '请求方法不被允许',
        408: '请求超时，请稍后重试',
        409: '请求冲突，资源已存在或正在被使用',
        410: '请求的资源已被永久删除',
        413: '请求体过大，请减少数据量',
        414: '请求URI过长',
        415: '不支持的媒体类型',
        422: '请求数据验证失败',
        429: '请求过于频繁，请稍后再试',

        // 5xx 服务器错误
        500: '服务器内部错误，请稍后重试',
        501: '服务器不支持该功能',
        502: '网关错误，请稍后重试',
        503: '服务暂时不可用，请稍后重试',
        504: '网关超时，请稍后重试',
        505: 'HTTP版本不受支持'
    }

    /**
     * 处理HTTP错误
     * @param error - Axios错误对象
     * @returns 增强的错误对象
     */
    private handleError(error: AxiosError): Error {
        // 创建增强的错误对象
        const enhancedError: any = new Error()

        // 请求取消错误
        if (axios.isCancel(error)) {
            enhancedError.type = this.ERROR_TYPES.CANCEL
            enhancedError.message = '请求已被取消'
            enhancedError.code = 'ECONNABORTED'
            return enhancedError
        }

        // 服务器响应错误（收到响应但状态码不在2xx范围内）
        if (error.response) {
            const { status, data, statusText } = error.response

            enhancedError.type = status >= 500 ? this.ERROR_TYPES.SERVER : this.ERROR_TYPES.CLIENT
            enhancedError.status = status
            enhancedError.statusText = statusText

            // 优先使用服务器返回的错误消息
            if (data && typeof data === 'object') {
                enhancedError.message =
                    (data as any).message ||
                    (data as any).msg ||
                    (data as any).error ||
                    this.STATUS_ERROR_MAP[status] ||
                    `请求失败 (${status})`

                // 保存服务器返回的完整错误信息
                enhancedError.serverData = data
            } else {
                enhancedError.message = this.STATUS_ERROR_MAP[status] || `请求失败 (${status})`
            }

            // 特殊处理：401未授权时可能需要跳转登录
            if (status === 401) {
                enhancedError.needLogin = true
            }

            // 特殊处理：403权限不足
            if (status === 403) {
                enhancedError.noPermission = true
            }

            return enhancedError
        }

        // 请求已发送但没有收到响应
        if (error.request) {
            // 超时错误
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                enhancedError.type = this.ERROR_TYPES.TIMEOUT
                enhancedError.message = '请求超时，请检查网络连接或稍后重试'
                enhancedError.code = 'ECONNABORTED'
                return enhancedError
            }

            // 网络错误
            enhancedError.type = this.ERROR_TYPES.NETWORK
            enhancedError.code = error.code || 'NETWORK_ERROR'

            // 根据错误代码提供更具体的错误消息
            switch (error.code) {
                case 'ERR_NETWORK':
                    enhancedError.message = '网络连接失败，请检查网络设置'
                    break
                case 'ERR_CONNECTION_REFUSED':
                    enhancedError.message = '服务器拒绝连接，请检查服务器状态'
                    break
                case 'ERR_CONNECTION_RESET':
                    enhancedError.message = '连接被重置，请重试'
                    break
                case 'ERR_BAD_REQUEST':
                    enhancedError.message = '请求格式错误'
                    break
                default:
                    enhancedError.message = '网络请求失败，请检查网络连接'
            }

            return enhancedError
        }

        // 请求配置错误或其他未知错误
        enhancedError.type = this.ERROR_TYPES.UNKNOWN
        enhancedError.message = error.message || '未知错误，请稍后重试'
        enhancedError.code = error.code || 'UNKNOWN'

        return enhancedError
    }

    /**
     * 设置请求头
     * @param config - 请求配置
     * @returns 更新后的配置
     */
    private setHeaders(config: RequestConfig): AxiosRequestConfig {
        const headers: any = { ...config.headers }

        if (config.token) {
            if (config.useBearer) {
                headers.Authorization = `Bearer ${config.token}`
            } else {
                headers.Authorization = config.token
            }
        }

        return {
            ...config,
            headers
        }
    }

    /**
     * GET请求
     * @template T - 响应数据类型
     * @param url - 请求URL
     * @param config - 请求配置
     * @returns Promise<T>
     */
    public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
        const requestConfig = config ? this.setHeaders(config) : {}
        return this.instance.get(url, requestConfig)
    }

    /**
     * POST请求
     * @template T - 响应数据类型
     * @param url - 请求URL
     * @param data - 请求数据
     * @param config - 请求配置
     * @returns Promise<T>
     */
    public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const requestConfig = config ? this.setHeaders(config) : {}
        return this.instance.post(url, data, requestConfig)
    }

    /**
     * PUT请求
     * @template T - 响应数据类型
     * @param url - 请求URL
     * @param data - 请求数据
     * @param config - 请求配置
     * @returns Promise<T>
     */
    public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const requestConfig = config ? this.setHeaders(config) : {}
        return this.instance.put(url, data, requestConfig)
    }

    /**
     * DELETE请求
     * @template T - 响应数据类型
     * @param url - 请求URL
     * @param config - 请求配置
     * @returns Promise<T>
     */
    public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        const requestConfig = config ? this.setHeaders(config) : {}
        return this.instance.delete(url, requestConfig)
    }

    /**
     * PATCH请求
     * @template T - 响应数据类型
     * @param url - 请求URL
     * @param data - 请求数据
     * @param config - 请求配置
     * @returns Promise<T>
     */
    public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const requestConfig = config ? this.setHeaders(config) : {}
        return this.instance.patch(url, data, requestConfig)
    }
}

/** 默认HTTP客户端实例 */
export const httpClient = new HttpClient()

/**
 * 创建自定义HTTP客户端实例
 * @param baseURL - 基础URL
 * @param timeout - 超时时间（毫秒）
 * @returns HttpClient实例
 */
export function createHttpClient(baseURL?: string, timeout?: number): HttpClient {
    return new HttpClient(baseURL, timeout)
}

// 导出便捷方法
/**
 * GET请求便捷方法
 * @template T - 响应数据类型
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise<T>
 */
export const gget = <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return httpClient.get<T>(url, config)
}

/**
 * POST请求便捷方法
 * @template T - 响应数据类型
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise<T>
 */
export const ppost = <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return httpClient.post<T>(url, data, config)
}

/**
 * PUT请求便捷方法
 * @template T - 响应数据类型
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise<T>
 */
export const pput = <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return httpClient.put<T>(url, data, config)
}

/**
 * DELETE请求便捷方法
 * @template T - 响应数据类型
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise<T>
 */
export const ddel = <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return httpClient.delete<T>(url, config)
}

export default httpClient
