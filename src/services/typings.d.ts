declare namespace API {
  // 分页参数
  interface PageParams {
    page: number
    pageSize: number
  }
  // 通用返回结果
  interface Result<T> {
    data: T
  }
  // 成功返回结果
  type Success = null
}
