import { AppTypeEnum } from '@/enum/components/analyze'

export function demo() {
  return 'demo'
}

export function downloadFile(fileUrl: string, name?: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', fileUrl, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      const blob = xhr.response
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = name || '未命名'
      a.click()
      window.URL.revokeObjectURL(url)

      resolve(true)
    }
    xhr.onerror = () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false)
    }
    xhr.send()
  })
}

export function get_weibo_url(url: string, app_type: AppTypeEnum) {
  if (app_type === AppTypeEnum.WEIBO) {
    const result = `/api/system/image_proxy?url=${url}`
    return result
  }
  return url
}
