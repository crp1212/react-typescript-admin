import { requestLogin, requestLogout } from '@/apis/login'
import createFetchFlow from '@/utils/createFetchFlow'

export const loginFlow = createFetchFlow('LOGIN', requestLogin)
export const logoutFlow = createFetchFlow('LOGOUT', requestLogout)