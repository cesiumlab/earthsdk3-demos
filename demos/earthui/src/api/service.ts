//封装 get 请求
export function get<T>(url: string, token?: string): Promise<T> {
    const headers = createHeaders(token);
    return request<T>(url, { headers }) as Promise<T>;
}

// 封装 GET 无 token 请求
export function getNoToken<T>(url: string): Promise<T> {
    const headers = createHeaders();
    return request<T>(url, { headers }) as Promise<T>;
}

// 封装 GET 无 token 请求 text
export function getNoTokenText(url: string): Promise<string> {
    const headers = createHeaders();
    return request<string>(url, { headers }, 'text') as Promise<string>;
}

// 封装 GET 需要 Bearer + token 请求
export function getWithCookie<T>(url: string, token: string): Promise<T> {
    const headers = createHeaders(token, true);
    return request<T>(url, { headers }) as Promise<T>;
}

// 封装 POST 请求
export function post<T>(url: string, data: any, token?: string): Promise<T> {
    const headers = createHeaders(token);
    return request<T>(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }) as Promise<T>;
}

// 封装 PUT 请求
export function put<T>(url: string, data: any, token?: string): Promise<T> {
    const headers = createHeaders(token, true);
    return request<T>(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    }) as Promise<T>;
}

// 统一的错误处理函数
function handleResponseError(response: Response): void {
    if (!response.ok) {
        const errorMessages: Record<number, string> = {
            400: '发送的请求报文有语法错误，服务器无法理解',
            401: '发送的请求未通过身份验证，需要授权',
            403: '服务器收到了客户端的请求，但由于某些原因拒绝提供服务',
            404: '无法找到请求的资源',
            500: '服务器内部错误,请检查'
        };

        const message = errorMessages[response.status] || '其他服务器错误';
        throw new Error(message);
    }
}

// 统一的网络错误处理函数
function handleNetworkError(error: unknown): never {
    if (error instanceof TypeError) {
        if (error.message.includes('network')) {
            throw new Error('网络错误，请检查您的网络连接');
        } else if (error.message.includes('CORS') || error.message.includes('cors')) {
            throw new Error('跨域错误，请检查您的请求地址');
        } else {
            throw new Error('获取数据失败，请检查');
        }
    } else {
        throw new Error(String(error));
    }
}

// 创建请求头
function createHeaders(token?: string, useBearer: boolean = false): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = useBearer ? `Bearer ${token}` : token;
    }

    return headers;
}

// 统一的请求处理函数
async function request<T>(
    url: string,
    options: RequestInit,
    responseType: 'json' | 'text' = 'json'
): Promise<T | string> {
    try {
        const response = await fetch(url, options);
        handleResponseError(response);

        if (responseType === 'text') {
            return await response.text();
        } else {
            return await response.json();
        }
    } catch (error) {
        handleNetworkError(error);
    }
}
