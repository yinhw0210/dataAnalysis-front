import { DownloadOutlined } from '@ant-design/icons'
import { Button, message, Segmented } from 'antd'
import download from 'downloadjs'
import React, { useMemo, useState } from 'react'

interface IProps {
  data: API.Analyze.GetRedBookResult
}

function XHSComp(props: IProps) {
  const { data } = props
  const [xhsType, setXhsType] = useState<'image' | 'live'>('image')

  const showLive = useMemo(() => {
    return Boolean(data?.data?.live_list && data?.data?.live_list?.length > 0)
  }, [data])

  const onHandleDownload = (url: string) => {
    download(url)
    message.success('下载成功')
  }
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        {showLive && (
          <Segmented<string>
            options={[
              {
                label: '图片',
                value: 'image',
              },
              {
                label: 'live',
                value: 'live',
              },
            ]}
            value={xhsType}
            onChange={(value) => {
              setXhsType(value as 'image' | 'live')
            }}
          />
        )}
        {xhsType === 'image' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {
              data?.data?.image_list?.map((item, index) => {
                return (
                  <div
                    className="aspect-[1/1] rounded-md relative cursor-pointer group"
                    key={index}
                  >
                    <img src={item} alt="" className="w-full h-full object-cover rounded-md" />
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
        )}
        {xhsType === 'live' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {
              data?.data?.live_list?.map((item, index) => {
                return (
                  <div className="flex flex-col gap-2">
                    <div
                      className="aspect-[1/1] rounded-md relative"
                      key={index}
                    >
                      <video
                        className="w-full h-full video_box relative z-[1]"
                        webkit-playsinline="true"
                        x5-video-player-type="h5"
                        preload="metadata"
                        x-webkit-airplay="true"
                        x5-video-orientation="portraint"
                        x5-video-player-fullscreen="true"
                        controls
                        controlsList="nodownload"
                        crossOrigin="anonymous"
                        src={item}
                      >
                        {' '}
                        您的浏览器不支持 HTML5 video 标签
                        {' '}
                      </video>
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
        )}
      </div>
    </React.Fragment>
  )
}

export default XHSComp
