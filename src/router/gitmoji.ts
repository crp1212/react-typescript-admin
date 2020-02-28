import { lazy } from 'react'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let GimojiRoute = {
  path: '/gitmoji',
  exact: false,
  component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Gitmoji/List.tsx'))),
  meta: {
    title: 'gitmoji'
  }
}
export default GimojiRoute