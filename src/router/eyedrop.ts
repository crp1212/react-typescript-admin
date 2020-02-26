import { lazy } from 'react'
import Index from '@/views/system/Index.tsx'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let EyedropRoute = {
  path: '/eyedrop',
  exact: false,
  component:  () => CommonSuspenseContianer(lazy(() => import('@/views/eyedrop/list.tsx'))),
  meta: {
    title: '眼药水'
  },
  /* children: [
    {
      path: '/time-list',
      exact: true,
      customLayout: false,
      meta: {
        title: '时间管理'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/eyedrop/list.tsx')))
    }
  ] */
}
export default EyedropRoute