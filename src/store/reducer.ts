import { combineReducers } from 'redux'
import { combineReducer } from '../utils/reducerTool'
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGOUT_SUCCESS
} from './constant'
var initialState = {
  isLogin: true
}

export const root = combineReducer(initialState, {
  [REQUEST_LOGIN]: (state: any) => {
    return state
  },
  [REQUEST_LOGIN_SUCCESS]: (state: any, action: any) => ({
    ...state,
    isLogin: true,
    userName: action.userName
  }),
  [REQUEST_LOGOUT_SUCCESS]: (state: any) => ({
    ...state,
    isLogin: false
  })
})

export const createReducer = (injectReducer = {}) => {
    return combineReducers({
        root,
        ...injectReducer
    })
}
