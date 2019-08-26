import React, { Component } from 'react'


interface TemplateProps { 
  children: React.Component;
}
class Template extends Component<TemplateProps, {}> {
  public state = {

  }
  public componentDidMount () {
    console.log(this.props.children)
  }
  public render () {    
    return this.props.children
  }
}

export default Template


