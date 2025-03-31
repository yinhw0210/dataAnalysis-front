import type { AppTypeEnum, WorksTypeEnum } from '@/enum/components/analyze'

export namespace AnalyzeType {
  export interface GetRedBookParams {
    url: string
  }
  export interface AnalyzeResult {
    data: {
      /**
       * 图片列表
       */
      image_list: string[]

      /**
       * live图列表
       */
      live_list?: string[]

      /**
       * 视频链接
       */
      video?: string

      /**
       * 描述
       */
      description: string

      /**
       * 标题
       */
      title: string

      /**
       * 最终的url
       */
      final_url: string

      /**
       * 原始url
       */
      url: string

      /**
       * 应用类型
       */
      app_type: AppTypeEnum

      /**
       * 作品类型
       */
      works_type: WorksTypeEnum
    }
  }
}

declare global {
  namespace API {
    export import Analyze = AnalyzeType
  }
}
