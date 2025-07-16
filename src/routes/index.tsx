import AuthRoute from '@/components/AuthRoute'
import Layout from '@/layout'
import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

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
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        Component: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/youtube',
        Component: lazy(() => import('@/pages/Youtube')),
      },
      {
        path: '/test',
        Component: lazy(() => import('@/pages/Test')),
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
