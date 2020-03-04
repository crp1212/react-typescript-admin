import { lazy } from 'react'
import Index from '@/views/template/index'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let StockRoute = {
  path: '/stock',
  exact: false,
  component: Index,
  meta: {
    title: 'stock-manager'
  },
  children: [
    {
      path: '/optional/list',
      exact: true,
      customLayout: false,
      meta: {
        title: 'optional'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/OptionalList.tsx')))
    }, 
    {
      path: '/random/list',
      exact: true,
      customLayout: false,
      meta: {
        title: 'random'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/RandomList.tsx')))
    },
    {
      path: '/forecase/list',
      exact: true,
      customLayout: false,
      meta: {
        title: 'forecase'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/ForecaseList.tsx')))
    }
  ]
}
export default StockRoute