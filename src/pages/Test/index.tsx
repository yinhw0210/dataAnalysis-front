import analyzeService from '@/services/analyzeService'
import { useRequest } from 'ahooks'
import { Button, Input } from 'antd'
import { useState } from 'react'
import ReactJson from 'react-json-view'

function Test() {
  const [url, setUrl] = useState('')
  const { data, loading, run } = useRequest(async () => await analyzeService.getTestResult(url), {
    manual: true,
  })
  const getImage = (url: string) => {
    return url.replace(/^(http)s*(:\/\/)/, 'https://images.weserv.nl/?url=')
  }
  return (
    <div className="flex flex-col w-[1200px] mx-auto px-6 gap-[32px] py-6">
      <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="请输入视频链接" />
      <Button type="primary" loading={loading} onClick={() => run()}>解析</Button>
      <ReactJson src={data as any} />
      <img src={getImage('https://wx1.sinaimg.cn/osj1080/007ewZhEly1i0bs29pdc9j327u3brx6r.jpg')} alt="" className="size-[200px]" />
    </div>
  )
}

export default Test
