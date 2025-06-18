import { TrackTypeEnum } from '@/enum/components/track'
import analyzeService from '@/services/analyzeService'
import { onTracking } from '@/utils'
import { useRequest } from 'ahooks'
import { Button, Collapse, ConfigProvider, Input, message } from 'antd'
import { useMemo, useState } from 'react'
import RenderResult from './components/RenderResult'

const ENV = import.meta.env

function Home() {
  const [url, setUrl] = useState('')

  const { run, loading, data } = useRequest(async () => await analyzeService.getAnalyzeResult(url), {
    manual: true,
  })

  const items = useMemo(() => [
    {
      key: '1',
      label: $t('为什么链接解析不成功？'),
      children: (
        <div>
          <p>
            1、
            {$t('此视频已被隐藏或下架、无法解析')}
          </p>
          <p>
            2、
            {$t('链接必须是新的，不然解析会失败')}
          </p>
          <p>
            3、
            {$t('目前仅支持三个主流视频平台，其他平台正在开发中。')}
          </p>
          <p>
            4、
            {$t('由于快手的网站有重定向，如果解析失败，请重试几次，如果还是不行，请反馈给我们，谢谢！')}
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
            {$t('由于微信内置浏览器的限制，无法下载文件，请使用其他浏览器下载')}
          </p>
          <p>
            3、
            {$t('外置浏览器如果还是下载失败，请尝试使用浏览器内置的长按保存功能。')}
          </p>
        </div>
      ),
    },
    {
      key: '3',
      label: $t('有没有小程序版本'),
      children: (
        <div>
          {$t('目前没有小程序版本，敬请期待。')}
        </div>
      ),
    },
    {
      key: '4',
      label: $t('是否开源'),
      children: (
        <div>
          <p>
            1、
            {' '}
            {$t('是的，本项目已完全开源，遵循 MIT 开源协议。您可以在')}
            {' '}
            <a href="https://github.com/yinhw0210" className="text-blue-500" target="_blank" rel="noreferrer">GitHub</a>
            {' '}
            {$t('查看源代码。')}
          </p>
          <p>
            2、
            {$t('前端采用 React + TypeScript + TailwindCSS 开发，后端采用 Python + FastAPI 开发。')}
          </p>
        </div>
      ),
    },
  ], [url])

  const onHandleAnalyze = () => {
    if (url.includes('weibo')) {
      message.info($t('微博链接解析较慢，请耐心等待。'))
    }
    if (ENV.VITE_ENV === 'production') {
      Promise.all([
        onTracking({
          event_type: TrackTypeEnum.PARSE,
          event_params: {
            url,
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
        <Button type="primary" size="large" className="h-[50px]" loading={loading} onClick={onHandleAnalyze}>{$t('解析')}</Button>
        {data && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[#333]">{$t('解析结果：')}</div>
              <div
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              />
            </div>
            {data && <RenderResult data={data} />}
          </div>
        )}
      </div>
      <section id="features" className="pt-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{$t('为什么选择我们')}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{$t('快速处理')}</h3>
              <p className="text-gray-600">{$t('先进的算法确保快速处理您的视频')}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{$t('视频图片都支持')}</h3>
              <p className="text-gray-600">{$t('支持视频去水印，图片去水印')}</p>
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

export default Home
