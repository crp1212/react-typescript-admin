import { message } from 'antd'
let toString = Object.prototype.toString
export const isObject = (val: any) => {
  return toString.call(val) === '[object Object]'
}
export function isString (val: any) {
  return toString.call(val) === '[object String]'
}
export function isFunction (val: any) {
  return toString.call(val) === '[object Function]'
}
export function isArray (val: any) {
  return toString.call(val) === '[object Array]'
}

export const isUnEmptyArray = (arr: any[]) => {
  if (!Array.isArray(arr)) { return true }
  return arr.length > 0
}
export const isUnEmptyObject = (obj: any) => {
  if (!isObject(obj)) { return true }
  return Object.keys(obj).length > 0
}
export const errorNotify = (str: string) => { // 消息错误提醒
  message.error(str)
}
export function hexColorToRGB (hexColor = '') { // 
  if (hexColor.length !== 6) { 
    console.error('非正确的十六进制颜色') 
    return []
  }
  let tem = []
  let i = 0
  while (i < 6) {
    tem.push(hexColor.slice(i, i += 2))
  }
  return tem.map((val: string) => parseInt(val, 16))
}
export const getQueryStringArgs = (url: string) => {
  const arr = url.split('?')
  const qs = (arr.length === 2 ? arr[1] : '')
  let args: StringObject = {}
  const items = qs.length ? qs.split('&') : []
  for (let i = 0; i < items.length; i++) {
    const item = items[i].split('=')
    const name = decodeURIComponent(item[0])
    const value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}
export const clearEmptyProperty = function (obj: CommonObject | null): CommonObject | null {
  if (!obj) { return null }
  let tem: CommonObject = {}
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if ((isUnEmptyArray(value) && isUnEmptyObject(value) && !!value) || value === 0) {
      tem[key] = value
    }
  })
  return tem
}
export const formatQueryParams = function (query: StringObject): string {
  let result = clearEmptyProperty(query)
  if (!result) { return '' }
  return Object.keys(result).map(key => `${key}=${query[key]}`).join('&')
}
export const detachArrayByCondition = function (arr: any[],fn: Function) { // 根据判断条件分离出true和false两个数组的， 索引0是true 1是false
  let result: [any[], any[]] = [[], []]
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result[0].push(arr[i])
    } else {
      result[1].push(arr[i])
    }
  }
  return result
}