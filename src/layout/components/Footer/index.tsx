import { MehTwoTone } from '@ant-design/icons'
import React from 'react'

function Footer() {
  return (
    <React.Fragment>
      <div className="w-full border-t border-gray-200">
        <div className="max-w-[1200px] h-full mx-auto py-5 grid sm:grid-cols-3 grid-cols-1">
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.svg" alt="logo" className="w-[50px] h-[50px]" />
            <div className="text-gray-600">
              © 2012-2024
              {' '}
              <span className="font-bold">Solivix</span>
              <br />
              鲁ICP备2025153489号
            </div>
          </div>
          <div className="flex-col items-center gap-4 sm:flex hidden">
            <div className="text-gray-600 font-bold">
              {$t('联系我们')}
            </div>
            <div className="text-gray-600">
              <div className="mb-2">
                <span className="font-bold">
                  {$t('邮箱')}
                  ：
                </span>
                solivix@163.com
              </div>
              <div>
                <span className="font-bold">
                  {$t('地址')}
                  ：
                </span>
                山东省济南市
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 px-[16px] mt-[12px]">
            <div className="text-gray-600 font-bold sm:block hidden">
              {$t('网站说明')}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="text-gray-600">
                <MehTwoTone />
                <span className="ml-2">
                  {$t('此项目为个人项目，旨在提供一个免费的在线工具网站，方便用户在线处理图片和视频。')}
                </span>
              </div>
              <div className="text-gray-600">
                <MehTwoTone />
                <span className="ml-2">
                  {$t('本项目已完全开源，遵循 MIT 开源协议。您可以在')}
                  {' '}
                  <a href="https://github.com/yinhw0210" className="text-blue-500" target="_blank" rel="noreferrer">GitHub</a>
                  {' '}
                  {$t('仓库链接 查看完整代码，自由使用、修改和分发。欢迎社区参与和贡献！')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer
