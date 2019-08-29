import { createReducer } from '@/utils/reducerTool'
import { REQUEST_USERINFO, REQUEST_USERINFO_SUCCESS, REQUEST_USERINFO_FAIL, REQUEST_QINIUCONFIG, REQUEST_QINIUCONFIG_SUCCESS, REQUEST_QINIUCONFIG_FAIL } from './constant'

var initialState = {
  userInfo: null,
  QIniuConfig: null
}
const Common = createReducer(initialState, {
  [REQUEST_USERINFO]: (state: any, action: any) => {
    return state
  },
  [REQUEST_USERINFO_SUCCESS]: (state: any, action: any) => {
    return {
      ...state,
      userInfo: action.value
    }
  },
  [REQUEST_USERINFO_FAIL]: (state: any, action: any) => {
    console.log(action)
    return {
      ...state
    }
  },
  [REQUEST_QINIUCONFIG]: (state: any, action: any) => {
    return state
  },
  [REQUEST_QINIUCONFIG_SUCCESS]: (state: any) => ({
    ...state,
    isLogin: false
  }),
  [REQUEST_QINIUCONFIG_FAIL]: (state: any) => ({
    ...state
  })
})
export default Common
