import analyzeService from '@/services/analyzeService'
import { useRequest } from 'ahooks'
import { Button, Input } from 'antd'
import { useState } from 'react'
import XHSComp from './components/XHSComp'

function Home() {
  const [url, setUrl] = useState('')

  const { run, loading, data } = useRequest(async () => await analyzeService.getAnalyzeResult(url), {
    manual: true,
  })

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{$t('无水印下载多个平台视频和图片')}</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-[600px] mx-auto">{$t('抖音去水印，快手去水印，小红书去水印，快速、高质量地移除视频水印或图片水印')}</p>
      </div>
      <div className="text-center text-gray-600 mb-4 font-bold">
        {$t('问题反馈：')}
        solivix@163.com
      </div>
      <div className="max-w-[600px] mx-auto flex flex-col gap-4">
        <Input
          placeholder={$t('请输入视频链接')}
          size="large"
          value={url}
          className="h-[50px]"
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <Button type="primary" size="large" className="h-[50px]" loading={loading} onClick={run}>{$t('解析')}</Button>
        {data && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[#333]">{$t('解析结果：')}</div>
              <div className="text-sm text-gray-600">
                {
                  data?.description
                }
              </div>
            </div>
            <XHSComp data={data} />
          </div>
        )}
      </div>
      <section id="features" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">为什么选择我们</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">快速处理</h3>
              <p className="text-gray-600">先进的算法确保快速处理您的视频</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">视频图片都支持</h3>
              <p className="text-gray-600">支持视频去水印，图片去水印</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">免费使用</h3>
              <p className="text-gray-600">不收取任何费用</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
