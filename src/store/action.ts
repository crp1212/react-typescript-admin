import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT,
  REQUEST_LOGOUT_SUCCESS
} from './constant'
import {
  createAction
} from '../utils/reducerTool'

export const requestLogin = createAction(REQUEST_LOGIN)
export const requestLogout = createAction(REQUEST_LOGOUT)
export const requestLoginSuccess = createAction(REQUEST_LOGIN_SUCCESS)
export const requestLogoutSuccess = createAction(REQUEST_LOGOUT_SUCCESS)