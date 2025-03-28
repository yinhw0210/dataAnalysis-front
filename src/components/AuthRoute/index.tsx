import useStore from '@/store'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthRouteProps {
  children: React.ReactNode
}

/**
 * 路由鉴权组件
 * 1. 当用户访问根路径时，根据用户信息重定向到 /home 或 /login
 * 2. 当用户访问其他受保护路由时，检查是否有用户信息，没有则重定向到 /login
 */
function AuthRoute({ children }: AuthRouteProps) {
  const location = useLocation()
  const useInfo = useStore(state => state.useInfo)

  // 如果是根路径，根据用户信息决定重定向到哪里
  if (location.pathname === '/') {
    // 有用户信息，重定向到 home 页面
    if (useInfo) {
      return <Navigate to="/home" replace />
    }
    // 没有用户信息，重定向到 login 页面
    return <Navigate to="/login" replace />
  }

  // 非登录页面，需要鉴权
  if (location.pathname !== '/login') {
    // 如果没有用户信息，重定向到登录页
    if (!useInfo) {
      return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }
  }
  else {
    // 在登录页面，如果已登录，重定向到首页
    if (useInfo) {
      return <Navigate to="/home" replace />
    }
  }

  // 通过权限验证，正常渲染子组件
  return <>{children}</>
}

export default AuthRoute
