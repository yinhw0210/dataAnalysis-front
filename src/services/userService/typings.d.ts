import type { SourcePlatformEnum, TrackTypeEnum } from '@/enum/components/track'
import type { UserStatusEnum } from '@/enum/components/user'

export namespace UserType {
  export interface ListParams extends API.PageParams {
    username: string
  }

  export interface Tracking {
    /**
     * 用户id
     */
    user_id: number

    /**
     * 来源
     */
    source_platform: SourcePlatformEnum

    /**
     * 追踪类型
     */
    event_type: TrackTypeEnum

    /**
     * 额外参数
     */
    event_params?: Record<string, any>
  }

  export interface UserInfo {
    /**
     * 用户id
     */
    id: number

    /**
     * 用户名
     */
    username: string

    /**
     * 邮箱
     */
    email: string

    /**
     * 手机号
     */
    phone: string

    /**
     * 角色
     */
    role: string

    /**
     * 状态
     */
    status: UserStatusEnum

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 更新时间
     */
    updateTime: string
  }

  export interface ListResult {
    /**
     * 列表
     */
    list: UserInfo[]

    /**
     * 总数
     */
    total: number
  }
}

declare global {
  namespace API {
    export import User = UserType
  }
}
