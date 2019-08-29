import { createAction } from '@/utils/reducerTool'
import { REQUEST_USERINFO, REQUEST_QINIUCONFIG } from './constant'
export const InitUserinfo = createAction(REQUEST_USERINFO)
export const InitQiniuConfig = createAction(REQUEST_QINIUCONFIG)