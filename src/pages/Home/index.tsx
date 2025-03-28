import analyzeService from '@/services/analyzeService'
import { DownloadOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Image as AntdImage, Button, Input, message } from 'antd'
import download from 'downloadjs'
import { useState } from 'react'

function Home() {
  const [url, setUrl] = useState('')

  const { run, loading, data } = useRequest(async () => await analyzeService.getRedBook(url), {
    manual: true,
  })

  const onHandleDownload = (url: string) => {
    download(url)
    message.success('下载成功')
  }

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
              <div className="text-lg font-bold">{$t('解析结果(点击图片下载)：')}</div>
              <div className="text-sm text-gray-600">
                {
                  data?.data?.description
                }
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {
                data?.data?.image_list.map((item, index) => {
                  return (
                    <div className="aspect-[1/1] h-fit rounded-md relative cursor-pointer group" key={index}>
                      <AntdImage src={item} alt="" className="max-w-full max-h-full object-cover absolute top-0 left-0" rootClassName="size-full" preview={false} />
                      <div
                        onClick={() => {
                          onHandleDownload(item)
                        }}
                        className="absolute top-0 left-0 w-full h-full justify-center items-center bg-black/50 text-white text-center hidden group-hover:flex"
                      >
                        <div className="text-2xl font-bold"><DownloadOutlined /></div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
