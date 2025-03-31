import request from '@/utils/fetch'

class AnalyzeService {
  getXiaohongshu(url: string) {
    return request<API.Analyze.AnalyzeResult>({
      method: 'post',
      url: '/xiaohongshu/query',
      params: {
        url,
        format: 'json',
      },
      name: '小红书解析',
    })
  }

  getTiktok(url: string) {
    return request<API.Analyze.AnalyzeResult>({
      method: 'post',
      url: '/tiktok/analyze',
      params: {
        url,
        format: 'json',
      },
      name: '抖音解析',
    })
  }

  getAnalyzeResult(url: string) {
    return request<API.Analyze.AnalyzeResult>({
      method: 'post',
      url: '/analyze',
      params: {
        url,
        format: 'json',
      },
      name: '解析结果',
    })
  }

  getHealth() {
    return request<any>({
      method: 'get',
      url: '/health',
      name: '健康解析',
    })
  }
}

export default new AnalyzeService()
