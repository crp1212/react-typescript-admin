import { all, take, put, call } from 'redux-saga/effects'
import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT
} from './constant'
import {
  requestLoginSuccess,
  requestLogoutSuccess
} from './action'
function login () {}
function logout() {}
export function helloSaga () {
    
}
function* loginFlow () {
  while (true) {
    let action = yield take(REQUEST_LOGIN)
    yield call(login, { ...action })
    yield put(requestLoginSuccess({
        userName: action.userName
    }))
    action = yield take(REQUEST_LOGOUT)
    yield call(logout, { ...action })
    yield put(requestLogoutSuccess())
  }
}
export default function* rootSaga () {
  yield all([
    helloSaga(),
    loginFlow()
  ])
}
