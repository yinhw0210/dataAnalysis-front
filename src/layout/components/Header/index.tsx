import { Badge, Button, Dropdown } from 'antd'
import { useCallback, useMemo, useState } from 'react'

function Header() {
  const [key, setkey] = useState<string>(window.localStorage.getItem('lang') || 'zhcn')
  const onHandleChange = useCallback((_key: string) => {
    if (key === _key) {
      return
    }
    setkey(_key)
    window.localStorage.setItem('lang', _key)
    window.location.reload()
  }, [setkey])

  const items = useMemo(() => {
    return [
      {
        key: 'zhcn',
        label: (
          <div
            className="flex items-center gap-[4px]"
            onClick={() => {
              onHandleChange('zhcn')
            }}
          >
            <span>🇨🇳</span>
            <span>简体中文</span>
          </div>
        ),
      },
      {
        key: 'en',
        label: (
          <div
            className="flex items-center gap-[4px]"
            onClick={() => {
              onHandleChange('en')
            }}
          >
            <span>🇺🇸</span>
            <span>English</span>
          </div>
        ),
      },
      {
        key: 'ko',
        label: (
          <div
            className="flex items-center gap-[4px]"
            onClick={() => {
              onHandleChange('ko')
            }}
          >
            <span>🇰🇷</span>
            <span>한국어</span>
          </div>
        ),
      },
      {
        key: 'ja',
        label: (
          <div
            className="flex items-center gap-[4px]"
            onClick={() => {
              onHandleChange('ja')
            }}
          >
            <span>🇯🇵</span>
            <span>日本語</span>
          </div>
        ),
      },
    ]
  }, [])

  const buttonText = useMemo(() => {
    return items.find(item => item.key === key)?.label
  }, [key, items])

  return (
    <div className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16">
        <div className="h-full flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold text-gray-800">
            <Badge count="beta" color="red" offset={[-80, 0]}>
              <span className="text-lg sm:text-xl font-bold text-gray-800">Solivix</span>
            </Badge>
            <span className="text-[12px] text-gray-500 ml-[8px]">相信成长的力量</span>
          </div>
          <div className="flex items-center gap-4">

          </div>
          <div className="flex gap-4 items-center">
            <Dropdown menu={{ items }} placement="bottom" trigger={['hover']}>
              <Button>{buttonText}</Button>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
