import { requestLogin } from '@/apis/login'
import createFetchFlow from '@/utils/createFetchFlow'

export const loginFlow = createFetchFlow('LOGIN', requestLogin)