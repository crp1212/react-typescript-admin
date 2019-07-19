import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { createReducer } from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

var middleware = applyMiddleware(sagaMiddleware)
var args: any[] = [
  middleware
]
if (process.env.NODE_ENV !== 'production' ) { // 开发环境添加redux-devtools的插件
  var devtool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  devtool && args.push(devtool)
}

const store = createStore(
  createReducer(),
  compose.apply({}, args)
)
store.runSaga = (saga: any) => {
  sagaMiddleware.run(saga)
}
sagaMiddleware.run(rootSaga)
export default store