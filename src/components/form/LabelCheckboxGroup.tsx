import React, { Component } from 'react'
import CheckboxGroup from './CheckboxGroup'
import { CommonProps } from './form.d'
import styles from './Form.less'
import LabelContainer from './LabelContainer'


class LabelCheckboxGroup extends Component<CommonProps, {}> {
  public state = {
  }
  public onAction (obj: CommonObject) {
    let onAction = this.props.onAction
    onAction(obj)
  }
  public render () {
    let config = this.props.config    
    return <LabelContainer config={config}>
      <CheckboxGroup config={config} onAction={this.onAction.bind(this)}></CheckboxGroup>
    </LabelContainer>
  }
}


export default LabelCheckboxGroup


