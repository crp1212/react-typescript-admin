import React, { Component } from 'react'
import { Input as AntdInput } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
import Icon from '@/components/Icon/Icon'
class Input extends Component<CommonProps, {}> {
  public state = {
    value: '',
    isWarning: false
  }
  public componentDidMount () {
    
  }
  public onChange (e: React.ChangeEvent<HTMLInputElement> ) {
    let value = e.target.value
    this.setState({
      value,
      isWarning: false
    })
    this.props.onChange({
      value
    })
  }
  
  public render () {    
    let { placeholder, prefixIcon } = this.props.config
    let baseConfig = this.props.baseConfig
    let { value } = this.state
    let prefix = prefixIcon ? <Icon value={prefixIcon} size={14}></Icon> : ''
    return <AntdInput
      {...baseConfig} 
      allowClear 
      value={value}
      prefix={prefix}
      placeholder={placeholder || '请输入'} 
      onChange={ this.onChange.bind(this) }
    />
  }
}


export default BaseHoc(Input)


