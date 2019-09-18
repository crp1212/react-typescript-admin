import React, { Component } from 'react'
import { Input as AntdInput } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
import Icon from '@/components/Icon/Icon'
import { debouce } from '@/utils/index'

let debouceWarp = debouce(function (fn: Function) {
  fn()
}, 500)
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
    debouceWarp(() => {
      this.props.onChange({
        value
      })
    })
    
  }
  public noticeChange () {

  }
  
  public render () {    
    let { placeholder, prefixIcon } = this.props.config
    let baseConfig = this.props.baseConfig
    let { value } = this.state
    let prefix = prefixIcon ? <Icon value={prefixIcon} size={12}></Icon> : ''
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


