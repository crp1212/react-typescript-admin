import { lazy } from 'react'
import Index from '@/views/system/Index.tsx'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let SystemRoute = {
  path: '/system',
  exact: false,
  component: Index,
  meta: {
    title: '系统管理'
  },
  children: [
    {
      path: '/manager-list',
      exact: true,
      customLayout: false,
      meta: {
        title: '管理员'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/system/list.tsx')))
    }
  ]
}
export default SystemRoute