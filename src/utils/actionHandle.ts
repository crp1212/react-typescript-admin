import { fetch } from '@/apis/index'
import { isFunction } from './index'

interface ActionHandleParamParameter {
  actionType: string;
  key: string;
  row?: CommonObject; // 具体查询参数, 用于列表的中就是每一条返回的数据的所有字段
  text?: string;
  [propName: string]: any;
}
interface ActionHandleParam extends CommonObject{
  parameter: ActionHandleParamParameter;
  handlers?: FunctionObject;
  context?: any;
  queryOption?: StringObject;
}

interface QueryHandleParam extends ActionHandleParam {
  queryOption: StringObject;
}

function queryOptionHandle (queryOption: StringObject, parameter: CommonObject) { // 对queryOption处理赋值
  if (parameter.querys) { // 通过数组传递key value
    parameter.querys.forEach((item: StringObject) => {
      queryOption[item.key] = item.value
    })
  } else if (parameter.key) { // 直接通过对象的key传递
    queryOption[parameter.key] = parameter.value
  } // 例如查询按钮query事件, 此时就不会有参数的修改
}

function queryHandle (params: QueryHandleParam ) {
  let { parameter, handlers, context, queryOption, requestFn } = params
  if (!queryOption) { 
    console.error('请检查是否传入queryOption')
    return
  }
  queryOptionHandle(queryOption, parameter) // 对queryOption的统一处理赋值
  let fn = requestFn || (handlers && handlers.requestFn)
  fn && fn.call(context)
}

function changeHandle (params: QueryHandleParam) {
  let { parameter, queryOption } = params
  queryOptionHandle(queryOption, parameter)
} 
function openWindowHandle (params: QueryHandleParam) {
  console.log(params)
  let parameter = params.parameter
  if (!parameter.row) { 
    console.error('此处parameter.row不能为空')
    return 
  }
  let url = parameter.row[parameter.key]
  window.open(url)
}
async function requestHandle (params: QueryHandleParam) {
  let { requestTarget, requestParam, before, success, errorHandle } = params.parameter
  let requestFn: Function
  if (isFunction(requestTarget)) {
    requestFn = requestTarget
  } else {
    requestFn = fetch(requestTarget.method, requestTarget.url)
  }
  try {
    before && before()
    let data = await requestFn(requestParam)
    success && success()
  } catch (error) {
    errorHandle && errorHandle(error)
  }
}

function commonHandle (params: QueryHandleParam) {
  let handlers = params.handlers
  let actionType = params.parameter.actionType
  let dealFn = handlers && handlers[actionType]
  if (!dealFn) { // 没有提供处理函数
    console.error(`并未提供对 actionType=${actionType} 的处理器`)
    return
  }
  dealFn(params.parameter, params)
}

let actionTypeDispath: FunctionObject = {
  query: queryHandle,
  change: changeHandle,
  add: commonHandle,
  filter: commonHandle,
  request: requestHandle,
  openWindow: openWindowHandle
}

export default function actionHandle (params: ActionHandleParam ) {
  let { parameter, queryOption } = params
  let actionType = parameter.actionType
  if (!actionType) {
    console.error('不存在actionType')
    return
  }
  queryOption = queryOption || {}
  let commonParams = {
    ...params,
    queryOption
  }
  let handlerFn = actionTypeDispath[actionType]
  if (handlerFn) {
    handlerFn(commonParams)
  } else {
    console.log(params)
    console.warn(`未能处理的actionType=${actionType}`)
  }
}
