import React from 'react'
import Input from './Input'
import { CommonProps } from './form.d'

let FormComponent: ReactComponentObject<CommonProps> = {
  Input
}
export function getFormComponent (config: NormalListUnitConfig, key: string | number) {
  if (config.hide) { return '' } // 标记了隐藏直接输出为空
  let Result: React.ComponentType<CommonProps> = FormComponent[config.UIType]
  if (!Result) { // 未定义的UIType
    console.warn(`未定义的UIType:${config.UIType}`)
    return
  }
  return <Result config={config} key={key}></Result>
}
export default FormComponent