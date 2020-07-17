import axios from 'axios'
import qs from 'qs'
import { errorNotify, isObject } from '@/utils/index'
import { compose } from 'redux'

interface RequestOption { // 配置请求函数时的
  closeGlobalErrorTips?: boolean; // 是否使用全局的的错误提示, 默认为true
  successDataHandles?: string[]; // 指定对请求成功的data的处理机制
}
let defaultOptions: RequestOption = {}
let unAuthHandleList: Function[] = []

function commonAxiosSuccessDataHandle (data: any) {
  let result = data
  if (isObject(result)) {
    Object.defineProperty(result, 'AxiosSourceData', {
      get () {
        return data
      }
    })
  }
  return result
}
let successDataHandleCollection: FunctionObject = { // 这里可以添加数据的处理器, 然后在定义接口时选用哪一个
  commonAxiosSuccessDataHandle
}
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

function requestSuccessHandle (res: any, resolve: any, reject: any, options = defaultOptions) { // 成功请求的
  let data = res.data // 返回的数据
  if (data.status === 401) { // 请求成功通过返回值判断是否登录的情况
    notifyUnAuth()
  }
  let successDataHandles = options.successDataHandles || ['commonAxiosSuccessDataHandle']
  let dataHandle = successDataHandles.length > 0
    ? compose.apply(null, successDataHandles.map(name => successDataHandleCollection[name]))
    : (val: any) => val // 如果设置是空数组则代表原值返回
  let result = dataHandle(data)
  resolve(result)
}

function requestFailHandle (res: any, resolve: any, reject: any, options = defaultOptions) {
  let closeGlobalErrorTips = options.closeGlobalErrorTips
  let data = res.data // 如果的是由返回值的
  let message: string = typeof data === 'string' ? data : data.message
  reject(message)
  if (!closeGlobalErrorTips) { // 没有要求关闭全局的错误提示
    errorNotify(message)
  }
}

export const fetch = (method: string, url: string, options = defaultOptions) => {
  return (params = {}, config = {}) => new Promise<CommonObject>((resolve, reject) => {
    let parameter = formatParams(method, params, config)
    let requesrFn: (url: string, params: any, config?: any) => any  = getAxiosFn(method)
    requesrFn(url, parameter, config).then((response: any) => {
      let status: number = response.status
      requestSuccessHandle(response, resolve, reject)
    }).catch((error: any) => {
      console.log(error)
      requestFailHandle(error.response, resolve, reject, options)
    })
  })
}

export const watchUnLogin = (fn: Function) => {
  unAuthHandleList.push(fn)
}
