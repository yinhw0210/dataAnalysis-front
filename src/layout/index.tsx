import { ConfigProvider } from 'antd'
import Content from './components/Content'
import Header from './components/Header'

function Layout() {
  return (
    <ConfigProvider>
      <main className="size-full flex flex-col overflow-hidden">
        <Header />
        <Content />
      </main>
    </ConfigProvider>
  )
}

export default Layout
