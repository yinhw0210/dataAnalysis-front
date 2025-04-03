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
  return (
    <div className="flex flex-col w-[1200px] mx-auto px-6 gap-[32px] py-6">
      <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="请输入视频链接" />
      <Button type="primary" loading={loading} onClick={() => run()}>解析</Button>
      <ReactJson src={data as any} />
    </div>
  )
}

export default Test
