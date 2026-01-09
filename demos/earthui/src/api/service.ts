//封装 get 请求
export function get<T>(url: string, token?: string): Promise<T> {
  let header: any
  if (token) {
    header = {
      'Content-Type': 'application/json',
      Authorization: token
    }
  } else {
    header = {
      'Content-Type': 'application/json'
    }
  }

  return fetch(url, { headers: header })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.json() // 如果响应ok，‌则解析json数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}
//封装 get无token 请求
export function getNoToken<T>(url: string): Promise<T> {
  let header: any
  return fetch(url, { headers: header })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.json() // 如果响应ok，‌则解析json数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}

//封装 get无token 请求text
export function getNoTokenText(url: string): Promise<string> {
  let header: any
  return fetch(url, { headers: header })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.text() // 如果响应ok，‌则解析text数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}
//封装 get需要Bearer+token 请求
export function getWithCookie<T>(url: string, token: string): Promise<T> {
  let header = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  } as any

  return fetch(url, { headers: header })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.json() // 如果响应ok，‌则解析json数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}

// 封装 POST 请求
export function post<T>(url: string, data: any, token?: any): Promise<T> {
  let header: any
  if (token) {
    header = {
      'Content-Type': 'application/json',
      Authorization: token
    }
  } else {
    header = {
      'Content-Type': 'application/json'
    }
  }

  return fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.json() // 如果响应ok，‌则解析json数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}
// 封装 PUT 请求
export function put<T>(url: string, data: any, token?: string): Promise<T> {
  let header: any
  if (token) {
    header = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  } else {
    header = {
      'Content-Type': 'application/json'
      // 'Authorization': localStorage.getItem('token')
    }
  }
  return fetch(url, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) {
        // 如果响应状态码不在200-299之间，‌则认为响应不ok
        if (response.status === 400) {
          throw new Error('发送的请求报文有语法错误，‌服务器无法理解')
        } else if (response.status === 401) {
          throw new Error('发送的请求未通过身份验证，‌需要授权')
        } else if (response.status === 403) {
          throw new Error('服务器收到了客户端的请求，‌但由于某些原因拒绝提供服务')
        } else if (response.status === 404) {
          throw new Error('无法找到请求的资源')
        } else if (response.status === 500) {
          // 如果是服务器内部错误
          throw new Error('服务器内部错误,请检查') // 返回特定的错误信息
        } else {
          throw new Error('其他服务器错误') // 对于其他服务器错误，‌可以统一返回一个通用的错误信息
        }
      }
      return response.json() // 如果响应ok，‌则解析json数据
    })
    .catch((error) => {
      // 处理所有其他类型的错误，‌例如网络错误、‌CORS问题等
      if (error instanceof TypeError && error.message.includes('network')) {
        throw new Error('网络错误，‌请检查您的网络连接')
      } else if (
        (error instanceof TypeError && error.message.includes('CORS')) ||
        error.message.includes('cors')
      ) {
        throw new Error('跨域错误，‌请检查您的请求地址')
      } else if (error instanceof TypeError) {
        throw new Error('获取数据失败，请检查')
      } else {
        throw new Error(error)
      }
    })
}
