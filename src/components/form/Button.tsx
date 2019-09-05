import React, { Component } from 'react'
import { Button as AntdButton } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
import Icon from '@/components/Icon/Icon'


class Button extends Component<CommonProps, {}> {
  public state = {
  }
  public onClick () {
    let onAction = this.props.onAction
    onAction && onAction(this.props.config)
  }
  public render () {
    let { text, type } = this.props.config    
    let baseConfig = this.props.baseConfig
    return <AntdButton
      {...baseConfig}
      type={type}
      onClick={ this.onClick.bind(this) }
    >{text}</AntdButton>  
  }
}


export default BaseHoc(Button)


