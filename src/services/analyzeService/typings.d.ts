export namespace AnalyzeType {
  export interface GetRedBookParams {
    url: string
  }
  export interface GetRedBookResult {
    data: {
      /**
       * 图片列表
       */
      image_list: string[]
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
    }
  }
}

declare global {
  namespace API {
    export import Analyze = AnalyzeType
  }
}
