import React, { Component } from 'react'
import styles from './Icon.less'

interface IconProps { 
  value: string;
  size?: number;
  className?: string;
  onClick?: Function;
  attrs?: StringObject; // 自定义元素属性
}

class Icon extends Component<IconProps, {}> {
  public state = {
  }
  public onClick () {
    this.props.onClick && this.props.onClick()
  }
  public getIconClassName () {
    return `${this.props.className} ${styles.icon} iconfont icon-${this.props.value}`
  }
  public getCustomStyle () {
    let styleObject: StringObject = {}
    let size = this.props.size ||''
    if (size) { styleObject.fontSize = size + 'px' }
    return styleObject
  }
  public render () {    
    return <i 
      className={ this.getIconClassName() } 
      style={ this.getCustomStyle() } 
      onClick={ this.onClick.bind(this) }
      { ...this.props.attrs }
    ></i>
  }
}


export default Icon


