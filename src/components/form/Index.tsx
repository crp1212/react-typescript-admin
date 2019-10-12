import React from 'react'
import Input from './Input'
import Button from './Button'
import TableFilterButton from './TableFilterButton'
import LabelSelect from './LabelSelect'
import LabelCheckboxGroup from './LabelCheckboxGroup'
import LabelInput from './LabelInput'
import CheckboxGroup from './CheckboxGroup'
import RadioGroup from './RadioGroup'
import LabelRadioGroup from './LabelRadioGroup'
import Select from './Select'
import { CommonProps } from './form.d'

let FormComponent: ReactComponentObject<CommonProps> = {
  Input,
  Button,
  Select,
  TableFilterButton,
  LabelSelect,
  LabelCheckboxGroup,
  CheckboxGroup,
  LabelInput,
  RadioGroup,
  LabelRadioGroup
}
export function getFormComponent (config: NormalListUnitConfig, key: string | number, onAction: Function, optionalParam?: CommonObject) {
  if (config.hide) { return '' } // 标记了隐藏直接输出为空
  let Result: React.ComponentType<CommonProps> = FormComponent[config.UIType]
  if (!Result) { // 未定义的UIType
    console.warn(`未定义的UIType:${config.UIType}`)
    return
  }
  return <Result config={config} key={key} onAction={onAction} optionalParam={optionalParam || {}}></Result>
}
export default FormComponent