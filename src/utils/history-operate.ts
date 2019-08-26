import { createHashHistory } from 'history'
import { formatQueryParams, getQueryStringArgs } from '@/utils/index'
/* history操作 */
export interface HistoryOption {
  pathname: string;
  query?: StringObject;
  state?: CommonObject;
}
export interface HistoryChangeParams {
  pathname: string;
  query: StringObject;
  search: string;
  state: any;
}
let id = 1
let history = createHashHistory()
let currentPath = ''
let watchQueue: CommonObject = {} // 监听路由变化的队列

history.listen((location, action) => {
  let {pathname, search, state} = location
  if (currentPath !== pathname) {
    try {
      Object.keys(watchQueue).forEach((key) => {
        let fn = watchQueue[key]
        fn && fn({
          pathname,
          query: getQueryStringArgs(search),
          search,
          state
        })
      })
      currentPath = pathname
    } catch (error) {
      console.log(error)
    }
  }
  
})

export function push (option: HistoryOption) {
  history.push({
    pathname: option.pathname,
    search: option.query ? formatQueryParams(option.query) : '',
    state: option.state || null
  })
}
export function getPathname () {
  return history.location.pathname
}
export function watch (fn: Function, firstEmit: boolean) { // firstEmit 表示首次加载要不要触发watch
  let value = ++id + ''
  watchQueue[value] = fn
  if (firstEmit) {
    fn(history.location)
  }
  return function () {
    delete watchQueue[value] 
  }
}
export default {
  push,
  watch,
  getPathname
}