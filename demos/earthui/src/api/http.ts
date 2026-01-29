/**
 * HTTP客户端封装
 * 基于axios实现的简单HTTP请求封装，支持GET、POST、PUT等方法
 * @module client
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

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
                return Promise.reject(this.handleError(error))
            }
        )
    }

    /**
     * 处理HTTP错误
     * @param error - Axios错误对象
     * @returns 错误消息
     */
    private handleError(error: AxiosError): Error {
        if (error.response) {
            // 服务器返回错误状态码
            const status = error.response.status
            switch (status) {
                case 400:
                    return new Error('发送的请求报文有语法错误，服务器无法理解')
                case 401:
                    return new Error('发送的请求未通过身份验证，需要授权')
                case 403:
                    return new Error('服务器收到了客户端的请求，但由于某些原因拒绝提供服务')
                case 404:
                    return new Error('无法找到请求的资源')
                case 500:
                    return new Error('服务器内部错误，请检查')
                default:
                    return new Error(`服务器错误: ${status}`)
            }
        } else if (error.request) {
            // 请求已发送但没有收到响应
            return new Error('网络错误，请检查您的网络连接')
        } else {
            // 请求配置出错
            return new Error(error.message || '请求失败，请检查')
        }
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
