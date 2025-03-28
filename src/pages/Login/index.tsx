import useStore from '@/store'
import {
  BilibiliFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GithubFilled,
  WechatFilled,
  WeiboSquareFilled,
  YoutubeFilled,
} from '@ant-design/icons'
import { Button, Input, message, Tabs } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'

function Login() {
  const [activeTab, setActiveTab] = useState('account')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const setUseInfo = useStore(state => state.setUseInfo)
  const navigate = useNavigate()
  const location = useLocation()

  // 处理登录
  const handleLogin = () => {
    if (!username || !password) {
      message.error('请输入账号和密码')
      return
    }

    setLoading(true)

    // 模拟登录请求
    setTimeout(() => {
      // 模拟登录成功
      setUseInfo({
        name: username,
        age: 20,
      })

      message.success('登录成功')

      // 如果有上一个页面的状态，就跳转回去
      const from = location.state?.from || '/home'
      navigate(from, { replace: true })

      setLoading(false)
    }, 1000)
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.logo}>Solivix</div>
            <div className={styles.tool}></div>
          </div>
          <div className={styles.content}>
            <div className={styles.info}></div>
            <div className={styles.form}>
              <h2 className="text-2xl font-medium mb-8">
                欢迎来到
                <span className="text-blue-600 font-bold"> Solivix</span>
              </h2>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'account',
                    label: '账号登录',
                  },
                  {
                    key: 'phone',
                    label: '手机号登录',
                  },
                ]}
                className="mb-6"
              />

              <div className="flex flex-col gap-4">
                <Input
                  placeholder="请输入账号名/账号ID"
                  size="large"
                  className="border-gray-300"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Input.Password
                  placeholder="请输入登录密码"
                  size="large"
                  className="border-gray-300"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                />

                <div className="text-sm text-gray-500">
                  登录视为您已同读并同意
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    服务条款
                  </a>
                  和
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    隐私政策
                  </a>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="h-12 text-base !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
                  onClick={handleLogin}
                  loading={loading}
                >
                  登录
                </Button>

                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <div className="space-x-4">
                    <a href="#" className="hover:text-blue-600">
                      忘记账号
                    </a>
                    <a href="#" className="hover:text-blue-600">
                      忘记密码
                    </a>
                  </div>
                  <div className="space-x-4">
                    <a href="#" className="hover:text-blue-600">
                      IAM子用户登录
                    </a>
                    <a href="#" className="hover:text-blue-600">
                      企业账号登录
                    </a>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-gray-400 text-center mb-4">
                    其他登录方式
                  </div>
                  <div className="flex justify-center gap-[16px] mt-[8px]">
                    <YoutubeFilled
                      style={{
                        color: 'rgb(156,163,175)',
                        fontSize: 24,
                      }}
                    />
                    <GithubFilled
                      style={{
                        color: 'rgb(156,163,175)',
                        fontSize: 24,
                      }}
                    />
                    <WechatFilled
                      style={{
                        color: 'rgb(156,163,175)',
                        fontSize: 24,
                      }}
                    />
                    <BilibiliFilled
                      style={{
                        color: 'rgb(156,163,175)',
                        fontSize: 24,
                      }}
                    />
                    <WeiboSquareFilled
                      style={{
                        color: 'rgb(156,163,175)',
                        fontSize: 24,
                      }}
                    />
                  </div>
                </div>

                <div className="text-center mt-6">
                  <span className="text-gray-600">没有账号？</span>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    现在就注册
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.text}>
              版权所有©北京火山引擎科技有限公司2025
              <br />
              京公网安备 11010802032137号 |
              京ICP备20018813号-3&nbsp;&nbsp;&nbsp;&nbsp;增值电信业务经营许可证：牌照京B2-20202418
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
