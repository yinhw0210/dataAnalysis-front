import { AppTypeEnum } from '@/enum/components/analyze'
import analyzeService from '@/services/analyzeService'
import { useRequest } from 'ahooks'
import { Button, Input } from 'antd'
import { useState } from 'react'
import XHSComp from './components/XHSComp'

function Home() {
  const [url, setUrl] = useState('')

  const { run, loading, data } = useRequest(async () => await analyzeService.getXiaohongshu(url), {
    manual: true,
  })

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{$t('无水印下载130多个平台视频和图片')}</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-[600px] mx-auto">{$t('抖音去水印，快手去水印，小红书去水印，快速、高质量地移除视频水印或图片水印')}</p>
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
              <div className="text-lg font-bold">{$t('解析结果：')}</div>
              <div className="text-sm text-gray-600">
                {
                  data?.data?.description
                }
              </div>
            </div>
            {data?.data.app_type === AppTypeEnum.XIAOHONGSHU && <XHSComp data={data} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
