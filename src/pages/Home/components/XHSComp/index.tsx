import XGPlayer from '@/components/XGPlayer'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, message, Segmented } from 'antd'
import download from 'downloadjs'
import React, { useMemo, useState } from 'react'

interface IProps {
    data: API.Analyze.AnalyzeResult
}

function XHSComp(props: IProps) {
    const { data } = props
    const [xhsType, setXhsType] = useState<'image' | 'live' | 'video'>('image')

    const showImage = useMemo(() => {
        return Boolean(data?.image_list && data?.image_list?.length > 0)
    }, [data])

    const showLive = useMemo(() => {
        return Boolean(data?.live_list && data?.live_list?.length > 0)
    }, [data])

    const showVideo = useMemo(() => {
        return Boolean(data?.video)
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
                            data?.image_list?.map((item, index) => {
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
                            data?.live_list?.map((item, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <div
                                            className="aspect-[1/1] rounded-md relative"
                                        >
                                            <XGPlayer src={item || ''} options={{
                                                poster: data?.image_list?.[0] || '',
                                                autoplay: true,
                                                controls:false
                                            }} />
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
                {(xhsType === 'video' || (!showImage && showVideo)) && (
                    <div className="flex flex-col gap-2">
                        <XGPlayer src={data?.video || ''} options={{
                            poster: data?.image_list?.[0] || '',
                        }} />
                        <Button
                            type="primary"
                            onClick={() => {
                                if (data?.video) {
                                    onHandleDownload(data?.video)
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
