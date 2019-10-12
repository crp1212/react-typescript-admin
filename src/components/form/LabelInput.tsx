import React, { Component } from 'react'
import Input from './Input'
import { CommonProps } from './form.d'
import LabelContainer from './LabelContainer'


class LabelInput extends Component<CommonProps, {}> {
  public state = {
  }
  public onAction (obj: CommonObject) {
    let onAction = this.props.onAction
    onAction(obj)
  }
  public render () {
    let config = this.props.config    
    return <LabelContainer config={config}>
      <Input config={config} onAction={this.onAction.bind(this)}></Input>
    </LabelContainer>
  }
}


export default LabelInput


