import createFetchFlow from '@/utils/createFetchFlow'
import { requestUserInfo, requestQiniuToken } from '@/apis/common'

export const InituserInfoFlow = createFetchFlow('USERINFO', requestUserInfo)
export const InitQiniuFlow = createFetchFlow('QINIUCONFIG', requestQiniuToken)