import React, { Component } from 'react'
import styles from './Icon.less'

interface IconProps { 
  value: string;
}

class Icon extends Component<IconProps, {}> {
  public state = {
  }
  public getIconClassName () {
    return `${styles.icon} iconfont icon-${this.props.value}`
  }
  public render () {    
    return <i className={ this.getIconClassName() }></i>
  }
}


export default Icon


