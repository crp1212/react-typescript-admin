/* 打开新窗口的方法 */
import { formatQueryParams } from './index'
export function openNewRouterPathByNewWindow (pathname: string, query: StringObject = {}, prefix = '') { // 以新窗口的模式打开新的路由地址
  if (!prefix) {
    prefix = location.origin + '/#'
  }
  let search = formatQueryParams(query)
  let url = prefix + pathname + (search ? '?' + search : '')
  console.log('url', url)
  window.open(url)
}