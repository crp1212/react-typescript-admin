import { createAction } from '@/utils/reducerTool'
import { REQUEST_USRINFO, REQUEST_QINIUCONFIG } from './constant'
export const InitUserinfo = createAction(REQUEST_USRINFO)
export const InitQiniuConfig = createAction(REQUEST_QINIUCONFIG)