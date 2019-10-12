import React, { Component } from 'react'
import RadioGroup from './RadioGroup'
import { CommonProps } from './form.d'
import styles from './Form.less'
import LabelContainer from './LabelContainer'


class LabelRadioGroup extends Component<CommonProps, {}> {
  public state = {
  }
  public onAction (obj: CommonObject) {
    let onAction = this.props.onAction
    onAction(obj)
  }
  public render () {
    let config = this.props.config    
    return <LabelContainer config={config}>
      <RadioGroup config={config} onAction={this.onAction.bind(this)}></RadioGroup>
    </LabelContainer>
  }
}


export default LabelRadioGroup


