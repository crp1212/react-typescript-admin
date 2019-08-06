import { createReducer } from '@/utils/reducerTool'
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT_SUCCESS,
  LOGIN,
  LOGOUT
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
      isLogin: true,
      userName: action.userName
    }
  },
  [REQUEST_LOGOUT_SUCCESS]: (state: any) => ({
    ...state,
    isLogin: false
  }),
  [LOGIN]: (state: any) => {
    return {
      isLogin: true
    }
  },
  [LOGOUT]: (state: any) =>{
    return {
      isLogin: false
    }
  }
})
export default Login
/* export const createReducer = (injectReducer = {}) => {
  return combineReducers({
    root,
    ...injectReducer
  })
} */
