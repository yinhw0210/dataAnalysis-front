import request from '@/utils/fetch'

class AnalyzeService {
  getXiaohongshu(url: string) {
    return request<API.Analyze.GetRedBookResult>({
      method: 'post',
      url: '/xiaohongshu/analyze',
      params: {
        url,
        format: 'json',
      },
      name: '小红书解析',
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
