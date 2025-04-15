import request from '@/utils/fetch'

class UserService {
  getUserInfo() {
    return request<API.User.ListResult>({
      method: 'get',
      url: '/getUserInfo',
      name: '代理人用户信息',
    })
  }

  tracking(data: API.User.Tracking) {
    return request<API.Success>({
      method: 'post',
      url: '/tracking/event',
      params: data,
      name: '用户追踪',
    })
  }
}

export default new UserService()
