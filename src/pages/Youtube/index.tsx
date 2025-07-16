import { TrackTypeEnum } from '@/enum/components/track'
import analyzeService from '@/services/analyzeService'
import { onTracking } from '@/utils'
import { useRequest } from 'ahooks'
import { Button, Collapse, ConfigProvider, Input, message, Select } from 'antd'
import saveAs from 'file-saver'
import { useMemo, useState } from 'react'
// import RenderResult from '../Home/components/RenderResult'

const ENV = import.meta.env

function Youtube() {
  const [url, setUrl] = useState('')
  const [resolution, setResolution] = useState('best')

  const { run, loading } = useRequest(async () => await analyzeService.getYoutube(url, resolution), {
    manual: true,
    onSuccess: (res) => {
      saveAs(res, 'youtube.mp4')
    },
  })

  const resolutionOptions = [
    { value: 'best', label: $t('最佳质量') },
    { value: '720p', label: '720p' },
    { value: '1080p', label: '1080p' },
  ]

  const items = useMemo(() => [
    {
      key: '1',
      label: $t('为什么链接解析不成功？'),
      children: (
        <div>
          <p>
            1、
            {$t('此视频可能无法访问、已被删除或设为私有')}
          </p>
          <p>
            2、
            {$t('链接必须是完整的YouTube视频链接')}
          </p>
          <p>
            3、
            {$t('部分地区可能无法访问YouTube，请确保您的网络环境可以正常访问YouTube')}
          </p>
        </div>
      ),
    },
    {
      key: '2',
      label: $t('文件下载失败是为什么？'),
      children: (
        <div>
          <p>
            1、
            {$t('文件下载失败，请检查链接是否有效')}
          </p>
          <p>
            2、
            {$t('由于视频文件较大，下载可能需要较长时间，请耐心等待')}
          </p>
          <p>
            3、
            {$t('部分浏览器可能会阻止下载，请尝试使用其他浏览器')}
          </p>
        </div>
      ),
    },
  ], [])

  const onHandleAnalyze = () => {
    if (!url) {
      message.error($t('请输入视频链接'))
      return
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      message.error($t('请输入正确的YouTube链接'))
      return
    }

    message.info($t('YouTube视频解析可能需要一些时间，请耐心等待'))

    if (ENV.VITE_ENV === 'production') {
      Promise.all([
        onTracking({
          event_type: TrackTypeEnum.PARSE,
          event_params: {
            url,
            resolution,
          },
        }),
        run(),
      ])
    }
    else {
      run()
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{$t('YouTube视频无水印下载')}</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-[600px] mx-auto">{$t('快速、高质量地下载YouTube视频，支持多种分辨率选择')}</p>
      </div>
      <div className="max-w-[600px] mx-auto flex flex-col gap-4">
        <Input
          placeholder={$t('请输入YouTube视频链接')}
          size="large"
          value={url}
          className="h-[50px]"
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <Select
          placeholder={$t('选择视频分辨率')}
          size="large"
          className="h-[50px]"
          value={resolution}
          onChange={value => setResolution(value)}
          options={resolutionOptions}
        />
        <Button type="primary" size="large" className="h-[50px]" loading={loading} onClick={onHandleAnalyze}>{$t('解析')}</Button>
      </div>
      <section id="features" className="pt-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{$t('为什么选择我们的YouTube解析工具')}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{$t('多种分辨率')}</h3>
              <p className="text-gray-600">{$t('提供多种分辨率选择，满足不同需求')}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{$t('高速下载')}</h3>
              <p className="text-gray-600">{$t('优化的下载速度，节省您的时间')}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{$t('免费使用')}</h3>
              <p className="text-gray-600">{$t('不收取任何费用')}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="pt-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{$t('常见问题')}</h2>
          <div>
            <ConfigProvider theme={{
              components: {
                Collapse: {
                  contentBg: '#fff',
                  headerBg: '#fff',
                  headerPadding: '16px',
                },
              },
            }}
            >
              <Collapse items={items} defaultActiveKey={['1']} />
            </ConfigProvider>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Youtube
