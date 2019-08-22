import axios from 'axios'
import qs from 'qs'
import { errorNotify } from '@/utils/index'

let unAuthHandleList: Function[] = []
function notifyUnAuth () { // 通知未认证
  unAuthHandleList.forEach((fn) => fn())
}
function formatParams (method: string, params: any, config?: any) { // 获取正确的参数格式
  let result
  if (['get', 'delete'].indexOf(method.toLowerCase()) > -1) {
    /* params.fromUrl = window.location.href */
    result = {
      params: {
        ...params,
        ...config
      }
    }
  } else {
    result = qs.stringify(params)
    console.log('result', result)
  }
  return result
}
function getAxiosFn (methods: string) {
  let fn: (url: string, params: any, config?: any) => any = () => {}
  switch (methods) {
    case 'get':
      fn = axios.get
      break
    case 'post':
      fn = axios.post
      break
    case 'delete':
      fn = axios.delete
      break
    case 'put':
      fn = axios.put
      break
    default:
      break
  }
  return fn
}
function requestSuccessHandle (res: any, resolve: any, reject: any) { // 成功请求的
  let data = res.data // 返回的数据
  if (data.status === 401) { // 请求成功通过返回值判断是否登录的情况
    notifyUnAuth()
  }
  resolve(data)
}
function requestFailHandle (res: any, resolve: any, reject: any, closeGlobalErrorTips: boolean) {
  let data = res.data // 如果的是由返回值的
  let message: string = typeof data === 'string' ? data : data.message
  reject(message)
  if (!closeGlobalErrorTips) { // 没有要求关闭全局的错误提示
    errorNotify(message)
  }
}

export const fetch = (method: string, url: string, closeGlobalErrorTips = false) => {
  return (params = {}, config = {}) => new Promise((resolve, reject) => {
    let parameter = formatParams(method, params, config)
    let requesrFn: (url: string, params: any, config?: any) => any  = getAxiosFn(method)
    requesrFn(url, parameter, config).then((response: any) => {
      let status: number = response.status
      requestSuccessHandle(response, resolve, reject)
    }).catch((error: any) => {
      console.log(error)
      requestFailHandle(error.response, resolve, reject, closeGlobalErrorTips)
    })
  })
}
export const watchUnLogin = (fn: Function) => {
  unAuthHandleList.push(fn)
}
