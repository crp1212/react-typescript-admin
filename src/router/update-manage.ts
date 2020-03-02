import { lazy } from 'react'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let WorkUpdateRoute = {
  path: '/work-update',
  exact: false,
  component:  () => CommonSuspenseContianer(lazy(() => import('@/views/WorkUpdate/List.tsx'))),
  meta: {
    title: '更新处理'
  }
}
export default WorkUpdateRoute