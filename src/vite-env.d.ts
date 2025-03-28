/// <reference types="vite/client" />

interface Window {
  /** 全局国际化翻译函数 */
  $t: (key: string) => string
}

// 定义全局函数
declare global {
  /**
   * 全局国际化翻译函数 (由 vite-auto-i18n-plugin 自动注入)
   * @param key 翻译键值
   * @param params 可选的参数对象，用于替换翻译文本中的占位符
   * @returns 翻译后的文本
   */
  function $t(key: string, params?: Record<string, any>): string
}

// 空导出使文件成为模块
export {}
