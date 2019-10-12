import React, { Component } from 'react'
import styles from './Form.less'

interface LabelContainerConfig {
  config: NormalListUnitConfig;
}
class LabelContainer extends Component<LabelContainerConfig, {}> {
  public render () {
    let config = this.props.config    
    let className = styles.label + ' ' + ( config.verify ? 'red-star' : '' )
    return <div className={styles.labelContainer}>
      <div className={className}>{ config.label }</div>
      {
        this.props.children
      }
    </div>
  }
}


export default LabelContainer


