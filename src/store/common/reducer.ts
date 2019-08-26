import { createReducer } from '@/utils/reducerTool'
import { REQUEST_USRINFO, REQUEST_USRINFO_SUCCESS, REQUEST_USRINFO_FAIL, REQUEST_QINIUCONFIG, REQUEST_QINIUCONFIG_SUCCESS, REQUEST_QINIUCONFIG_FAIL } from './constant'

var initialState = {
  userInfo: null,
  QIniuConfig: null
}
const Common = createReducer(initialState, {
  [REQUEST_USRINFO]: (state: any, action: any) => {
    return state
  },
  [REQUEST_USRINFO_SUCCESS]: (state: any, action: any) => {
    console.log(state, action)
    return {
      ...state,
      isLogin: true
    }
  },
  [REQUEST_USRINFO_FAIL]: (state: any, action: any) => {
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
