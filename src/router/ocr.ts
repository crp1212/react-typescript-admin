import { lazy } from 'react'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'

let OcrRoute = {
  path: '/ocr',
  exact: false,
  component:  () => CommonSuspenseContianer(lazy(() => import('@/views/Ocr/Index.tsx'))),
  meta: {
    title: 'ocr'
  }
}
export default OcrRoute