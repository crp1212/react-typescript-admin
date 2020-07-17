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
      path: '/index',
      exact: true,
      customLayout: false,
      meta: {
        title: 'index'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/Index')))
    },
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
      path: '/forecast/list',
      exact: true,
      customLayout: false,
      meta: {
        title: 'forecast'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/ForecastList')))
    },
    {
      path: '/transaction/analysis',
      exact: true,
      customLayout: false,
      meta: {
        title: 'transaction-analysis'
      },
      component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Stock/TransactionAnalysis')))
    }
    
  ]
}
export default StockRoute