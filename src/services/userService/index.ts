import request from '@/utils/fetch'

class UserService {
  getUserInfo() {
    return request<API.User.ListResult>({
      method: 'get',
      url: '/getUserInfo',
      name: '代理人用户信息',
    })
  }
}

export default new UserService()
