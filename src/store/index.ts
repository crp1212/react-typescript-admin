import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'
import Login from './login/reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './login/saga'

const sagaMiddleware = createSagaMiddleware()

var middleware = applyMiddleware(sagaMiddleware)
var args: any[] = [
  middleware
]
if (process.env.NODE_ENV !== 'production' ) { // 开发环境添加redux-devtools的插件
  var devtool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  devtool && args.push(devtool)
}

let rootReducer = combineReducers({
  Login
})
let enhancer: any = compose.apply({}, args)
const store = createStore(
  rootReducer,
  {},
  enhancer
)
/* store.runSaga = (saga: any) => {
  sagaMiddleware.run(saga)
} */
sagaMiddleware.run(rootSaga)

export default store