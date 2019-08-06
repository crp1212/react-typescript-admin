import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT,
  REQUEST_LOGOUT_SUCCESS
} from './constant'
import {
  createAction
} from '@/utils/reducerTool'

export const LoginAction = createAction(REQUEST_LOGIN)
export const LogoutAction = createAction(REQUEST_LOGOUT)
export const LoginSuccessAction = createAction(REQUEST_LOGIN_SUCCESS)
export const LogoutSuccessAction = createAction(REQUEST_LOGOUT_SUCCESS)