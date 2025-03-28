import AuthRoute from '@/components/AuthRoute'
import Layout from '@/layout'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: '/login',
    Component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: '/home',
        Component: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/user',
        Component: lazy(() => import('@/pages/User')),
        children: [
          {
            path: '/user/detail',
            Component: lazy(() => import('@/pages/User/DetailInfo')),
          },
        ],
      },
    ],
  },
])

export default routes
