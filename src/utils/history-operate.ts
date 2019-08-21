import { createHashHistory } from 'history'
import { formatQueryParams, getQueryStringArgs } from '@/utils/index'
/* history操作 */
export interface HistoryOption {
  path: string;
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
    Object.keys(watchQueue).forEach((key) => {
      watchQueue[key]({
        pathname,
        query: getQueryStringArgs(search),
        search,
        state
      })
    })
    currentPath = pathname
  }
  
})

export function push (option: HistoryOption) {
  history.push({
    pathname: option.path,
    search: option.query ? formatQueryParams(option.query) : '',
    state: option.state || null
  })
}
export function watch (fn: Function) {
  let value = ++id + ''
  watchQueue[value] = fn
  return function () {
    delete watchQueue[value] 
  }
}
export default {
  push,
  watch
}