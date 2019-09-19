import React from 'react'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { CommonProps } from './form.d'

let FormComponent: ReactComponentObject<CommonProps> = {
  Input,
  Button,
  Select
}
export function getFormComponent (config: NormalListUnitConfig, key: string | number, onAction: Function) {
  if (config.hide) { return '' } // 标记了隐藏直接输出为空
  let Result: React.ComponentType<CommonProps> = FormComponent[config.UIType]
  if (!Result) { // 未定义的UIType
    console.warn(`未定义的UIType:${config.UIType}`)
    return
  }
  return <Result config={config} key={key} onAction={onAction}></Result>
}
export default FormComponent