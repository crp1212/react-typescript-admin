import createFetchFlow from '@/utils/createFetchFlow'
import { requestUserInfo, requestQiniuToken } from '@/apis/common'

export const InituserInfoFlow = createFetchFlow('LOGIN', requestUserInfo)
export const InitQiniuFlow = createFetchFlow('LOGOUT', requestQiniuToken)