import React, { Component } from 'react'
import Select from './Select'
import { CommonProps } from './form.d'
import styles from './Form.less'
import LabelContainer from './LabelContainer'


class LabelSelect extends Component<CommonProps, {}> {
  public state = {
  }
  public onAction (obj: CommonObject) {
    let onAction = this.props.onAction
    onAction(obj)
  }
  public render () {
    let config = this.props.config    
    return <LabelContainer config={config}>
      <Select config={config} onAction={this.onAction.bind(this)}></Select>
    </LabelContainer>
  }
}


export default LabelSelect


