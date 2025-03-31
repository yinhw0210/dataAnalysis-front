import { DownloadOutlined } from '@ant-design/icons'
import { Button, message, Segmented } from 'antd'
import download from 'downloadjs'
import React, { useEffect, useMemo, useState } from 'react'
import Player, { Events } from 'xgplayer'
import 'xgplayer/dist/index.min.css'

interface IProps {
  data: API.Analyze.AnalyzeResult
}

function XHSComp(props: IProps) {
  const { data } = props
  const [xhsType, setXhsType] = useState<'image' | 'live' | 'video'>('image')

  const showImage = useMemo(() => {
    return Boolean(data?.data?.image_list && data?.data?.image_list?.length > 0)
  }, [data])
  const showLive = useMemo(() => {
    return Boolean(data?.data?.live_list && data?.data?.live_list?.length > 0)
  }, [data])

  const showVideo = useMemo(() => {
    return Boolean(data?.data?.video)
  }, [data])

  const options = useMemo(() => {
    return [
      ...(showImage
        ? [{
            label: '图片',
            value: 'image',
          }]
        : []),
      ...(showVideo
        ? [{
            label: '视频',
            value: 'video',
          }]
        : []),
      ...(showLive
        ? [{
            label: 'live',
            value: 'live',
          }]
        : []),
    ]
  }, [data, showVideo, showLive])

  const onHandleDownload = (url: string) => {
    download(url)
    message.success('下载成功')
  }

  useEffect(() => {
    if (showVideo) {
      const player = new Player({
        id: 'player',
        url: data?.data?.video,
        poster: data?.data?.image_list?.[0],
        width: '100%',
        height: '100%',
        autoplay: true,
        controls: true,
        muted: true,
        loop: true,
        volume: 0,
      })
      player.on(Events.PLAY, () => {
        console.log('play')
      })
    }
  }, [showVideo])

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        {(showLive || showVideo) && showImage && (
          <Segmented<string>
            options={options}
            value={xhsType}
            onChange={(value) => {
              setXhsType(value as 'image' | 'live' | 'video')
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
                      <div id="player" className="!h-[400px]"></div>
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
        {(xhsType === 'video' || showVideo) && (
          <div className="flex flex-col gap-2">
            <div id="player" className="!h-[400px]"></div>
            <Button
              type="primary"
              onClick={() => {
                if (data?.data?.video) {
                  onHandleDownload(data?.data?.video)
                }
              }}
            >
              {$t('下载')}
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default XHSComp
