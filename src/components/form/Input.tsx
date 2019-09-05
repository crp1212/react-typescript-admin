import React, { Component } from 'react'
import { Input as AntdInput, Icon } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
class Input extends Component<CommonProps, {}> {
  public state = {
  }
  public componentDidMount () {
    
  }
  public getComponentSize () {
    let size = this.props.config.size || this.props.size // 配置里没有设定size, 那么使用BaseHoc得到的默认size
    return size
  }
  public render () {    
    let { placeholder } = this.props.config
    return <AntdInput 
      size={ this.getComponentSize() }
      placeholder={placeholder || '请输入'} 
    />
  }
}


export default BaseHoc(Input)


