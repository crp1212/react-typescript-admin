import { isArray, isObject } from './index'
export function nonEmpty (val: any) { // 判断是否非空
  if (isArray(val)) { // 如果是数组
    return val.length !== 0
  } else if (isObject(val)) {
    return Object.keys(val).length !== 0
  } else if (val === 0) {
    return true
  } else {
    return !!val
  }
}
export function equal (a: any, b: any) {
  return a === b
}
export function noUndefined (value: any) {
  return value !== void 0
}
let Judge: FunctionObject = {
  nonEmpty,
  noUndefined,
  equal
}
export default Judge
