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

  getKuaishou(url: string) {
    return request<API.Analyze.AnalyzeResult>({
      method: 'post',
      url: '/kuaishou/analyze',
      params: { url, format: 'json' },
      name: '快手解析',
    })
  }

  getYoutube(url: string, quality: string) {
    return request<Blob>({
      method: 'get',
      url: '/analyze/youtube',
      params: {
        url,
        quality,
      },
      responseType: 'blob',
      name: 'YouTube解析',
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

  getTestResult(url: string) {
    return request<API.Analyze.AnalyzeResult>({
      method: 'post',
      url: '/test',
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

  getFileStream(url: string) {
    return request<any>({
      method: 'post',
      url: '/system/get_file_stream',
      name: '文件流',
      responseType: 'blob',
      params: {
        url,
      },
    })
  }
}

export default new AnalyzeService()
