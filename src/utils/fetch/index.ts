import type { AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from './request/types'
import Request from './request'

const ENV = import.meta.env

export interface fetchResponse<T> {
  statusCode: number
  desc: string
  result: T
}

// 重写返回类型
interface fetchRequestConfig<T> extends RequestConfig {
  data?: T
  name?: string
}

const request = new Request({
  baseURL: ENV.VITE_BASE_URL as string,
  timeout: 1000 * 60 * 5, // 超时时间 5分钟
  headers: {
    'Content-Type': 'application/json',
  } as AxiosRequestHeaders,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (requestConfig: InternalAxiosRequestConfig) => requestConfig,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 */
function fetch<T = any>(requestConfig: fetchRequestConfig<T>) {
  const { method = 'get' } = requestConfig
  const configInfo = { ...requestConfig }
  if (method === 'put' || method === 'post') {
    configInfo.data = requestConfig.params
    configInfo.params = null
  }
  return request.request<T>(configInfo as RequestConfig<T>)
}

// 取消请求
export function cancelRequest(url: string | string[]) {
  return request.cancelRequest(url)
}

// 取消全部请求
export function cancelAllRequest() {
  return request.cancelAllRequest()
}

export default fetch
