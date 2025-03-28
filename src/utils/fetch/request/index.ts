import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import type {
  CancelRequestSource,
  RequestConfig,
  RequestInterceptors,
} from './types'
import { message } from 'antd'
import axios from 'axios'
import lodash from 'lodash'

interface AxiosRequestConfigExtend extends InternalAxiosRequestConfig {
  name?: string
}

interface AxiosResponseExtend extends AxiosResponse {
  config: AxiosRequestConfigExtend
}

class Request {
  // axios 实例
  instance: AxiosInstance

  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>

  /**
   * 存放取消方法的集合
   * 在创建请求后将取消请求方法 push 到该集合中
   * 封装一个方法，可以取消请求，传入 url: string|string[]
   * 在请求之前判断同一URL是否存在，如果存在就取消请求
   */
  cancelRequestSourceList?: CancelRequestSource[]

  /**
   * 存放所有请求URL的集合
   * 请求之前需要将url push到该集合中
   * 请求完毕后将url从集合中删除
   * 添加在发送请求之前完成，删除在响应之后删除
   */
  requestUrlList?: string[]

  constructor(config: RequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)

    // 设置拦截器
    this.interceptorsObj = config.interceptors

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      async (reqConfig: AxiosRequestConfigExtend) => {
        console.log(
          `%c ${reqConfig.name}  ${reqConfig.url}-参数:`,
          'color:#FF0099;',
          reqConfig.params || reqConfig.data,
        )
        return {
          ...reqConfig,
          // transformRequest: [data => data],
        }
      },
      (err: unknown) => Promise.reject(err),
    )

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )

    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )

    // 全局响应拦截器 保证最后执行
    this.instance.interceptors.response.use(
      (res: AxiosResponseExtend) => {
        // 拦截响应数据，进行个性化处理
        const codeResult = lodash.get(res.data, 'code', '')
        if (codeResult === 'gateway-9992' || codeResult === 'oss-server-9989') {
          message.warning('登录失效，请重新登录')
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            msg: '登录失效，请重新登录',
          })
        }
        let response = res.data
        console.log(`%c ${res.config.name} 结果 `, 'color:#FF0099;', response)
        const { code } = response
        if (code === '0000' || code === 200 || code === 1) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(response)
      },
      (err: unknown) => {
        try {
          // error
          console.log(err)
        }
        catch (errorMsg) {
          // error
          console.log(errorMsg)
        }
        return Promise.reject(err)
      },
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      let configInfo = config
      if (config.interceptors?.requestInterceptors) {
        configInfo = config.interceptors.requestInterceptors(config as InternalAxiosRequestConfig)
      }
      const { url } = configInfo
      // url存在保存取消请求方法和当前请求url
      if (url) {
        this.requestUrlList?.push(url)
        configInfo.cancelToken = new axios.CancelToken((canceler) => {
          this.cancelRequestSourceList?.push({
            [url]: canceler,
          })
        })
      }
      this.instance
        .request<any, T>(configInfo)
        .then((res) => {
          let response = res
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            response = config.interceptors.responseInterceptors(res)
          }
          resolve(response)
        })
        .catch((err: unknown) => {
          reject(err)
        })
        .finally(() => {
          if (url) {
            this.delUrl(url)
          }
        })
    })
  }

  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url)
      if (sourceIndex !== -1) {
        this.cancelRequestSourceList?.[sourceIndex][url]()
      }
    }
    else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u)
        if (sourceIndex !== -1) {
          this.cancelRequestSourceList?.[sourceIndex][u]()
        }
      })
    }
  }

  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0]
      source[key]()
    })
  }

  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex(
      (item: CancelRequestSource) => {
        return Object.keys(item)[0] === url
      },
    ) as number
  }

  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url)
    const sourceIndex = this.getSourceIndex(url)
    // 删除url和cancel方法
    if (urlIndex !== -1 && typeof urlIndex === 'number') {
      this.requestUrlList?.splice(urlIndex, 1)
    }
    if (sourceIndex !== -1) {
      this.cancelRequestSourceList?.splice(sourceIndex, 1)
    }
  }
}

export default Request
