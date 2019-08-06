import { all, take, put, call } from 'redux-saga/effects'
import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT
} from './constant'
import {
  LoginSuccessAction,
  LogoutSuccessAction
} from './action'
import { requestLogin, requestLogout } from '@/apis/login'
export function helloSaga () {
    
}
function* loginFlow () {
  while (true) {
    let action = yield take(REQUEST_LOGIN)
    console.log(action)
    yield call(requestLogin, { ...action })
    yield put(LoginSuccessAction({
        userName: action.userName
    }))
    action = yield take(REQUEST_LOGOUT)
    yield call(requestLogout, { ...action })
    yield put(LogoutSuccessAction())
  }
}
export default function* rootSaga () {
  yield all([
    helloSaga(),
    // loginFlow()
  ])
}
