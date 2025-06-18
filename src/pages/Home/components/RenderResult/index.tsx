import XGPlayer from '@/components/XGPlayer'
import { AppTypeEnum } from '@/enum/components/analyze'
import analyzeService from '@/services/analyzeService'
// import { saveAs } from 'file-saver'
import { downloadFile, get_weibo_url } from '@/utils'
import { DownloadOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Button, message, Radio } from 'antd'
import saveAs from 'file-saver'
import React, { useMemo, useState } from 'react'

interface IProps {
  data: API.Analyze.AnalyzeResult
}

function RenderResult(props: IProps) {
  const { data } = props
  const [loading, setLoading] = useState(false)
  const [imageType, setImageType] = useState<'image' | 'live'>('image')

  const renderType = useMemo(() => {
    return data?.video ? 'video' : 'image'
  }, [data])

  const onHandleDownload = async (url: string, isVideo = false) => {
    setLoading(true)
    if (data.app_type === AppTypeEnum.DOUYIN && isVideo) {
      const res = await analyzeService.getFileStream(url)
      saveAs(res, 'douyin.mp4')
      setLoading(false)
      return
    }
    if (data.app_type === AppTypeEnum.WEIBO) {
      if (isVideo) {
        downloadFile(get_weibo_url(url, data.app_type), '未命名.mp4')
      }
      else {
        downloadFile(get_weibo_url(url, data.app_type), '未命名.jpg')
      }
      setLoading(false)
      return
    }
    if (isVideo) {
      message.info('若视频过大，请耐心等待，或可使用浏览器内置的长按保存功能。')
    }
    downloadFile(url)
    setLoading(false)
  }

  useMount(() => {
    if (data?.live_list && data?.live_list?.length > 0) {
      setImageType('live')
    }
  })

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        {renderType === 'video' && (
          <div className="flex flex-col gap-2">
            <XGPlayer
              src={data?.video || ''}
              options={{
                poster: data?.image_list?.[0] || '',
              }}
            />
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                if (data?.video) {
                  onHandleDownload(data?.video, true)
                }
              }}
            >
              {$t('下载')}
            </Button>
          </div>
        )}
        {renderType === 'image' && (
          <React.Fragment>
            {data?.live_list && data?.live_list?.length > 0 && (
              <Radio.Group
                optionType="button"
                value={imageType}
                onChange={(e) => {
                  setImageType(e.target.value as 'image' | 'live')
                }}
              >
                <Radio value="image">图片</Radio>
                <Radio value="live">live</Radio>
              </Radio.Group>
            )}
            <div
              className="grid-cols-2 sm:grid-cols-3 gap-4"
              style={{
                display: imageType === 'live' ? 'none' : 'grid',
              }}
            >
              {
                data?.image_list?.map((item, index) => {
                  return (
                    <div
                      className="aspect-[1/1] rounded-md relative cursor-pointer group"
                      key={index}
                    >
                      <img src={get_weibo_url(item, data?.app_type)} alt="" className="w-full h-full object-cover rounded-md" />
                      <div
                        onClick={() => {
                          onHandleDownload(item)
                        }}
                        className="absolute rounded-md top-0 left-0 w-full h-full justify-center items-center bg-black/50 text-white text-center hidden group-hover:flex"
                      >
                        <div className="text-2xl font-bold"><DownloadOutlined /></div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              style={{
                display: imageType === 'live' ? 'grid' : 'none',
              }}
            >
              {
                data?.live_list?.map((item, index) => {
                  return (
                    <div className="flex flex-col gap-2" key={index}>
                      <div
                        className="aspect-[1/1] rounded-md relative"
                      >
                        <XGPlayer
                          src={item || ''}
                          options={{
                            autoplay: true,
                            controls: false,
                          }}
                        />
                      </div>
                      <Button
                        type="primary"
                        onClick={() => {
                          onHandleDownload(item)
                        }}
                      >
                        {$t('下载')}
                      </Button>
                    </div>
                  )
                })
              }
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default RenderResult
