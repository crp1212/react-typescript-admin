import { createReducer } from '@/utils/reducerTool'
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGIN_FAIL,
  REQUEST_LOGOUT_FAIL
} from './constant'
var initialState = {
  isLogin: false,
  isRequestLogin: false
}
const Login = createReducer(initialState, {
  [REQUEST_LOGIN]: (state: any, action: any) => {
    return state
  },
  [REQUEST_LOGIN_SUCCESS]: (state: any, action: any) => {
    console.log(state, action)
    return {
      ...state,
      isLogin: true
    }
  },
  [REQUEST_LOGIN_FAIL]: (state: any, action: any) => {
    return {
      ...state
    }
  },
  [REQUEST_LOGOUT_SUCCESS]: (state: any) => ({
    ...state,
    isLogin: false
  }),
  [REQUEST_LOGOUT_FAIL]: (state: any) => ({
    ...state
  })
})
export default Login
/* export const createReducer = (injectReducer = {}) => {
  return combineReducers({
    root,
    ...injectReducer
  })
} */
