import React, { Component } from 'react'
import { CommonProps } from './form.d'



export default (WarppedComponent: React.ComponentType<CommonProps>) => {
  class BaseHoc extends Component<CommonProps, {}> {
    private size = 'default '
    private width = '220'
    public state = {
    }
    public getStyle () {
      let width = this.props.config.width || this.props.width || this.width
      return {
        width: width + 'px'
      }
    }
    public render () { // props的size可以覆盖默认的size
      let wrapConfig = {
        size: this.size,
        ...this.props
      }
      return <div style={ this.getStyle() }>
        <WarppedComponent  {...wrapConfig} />
      </div>
    }
  }
  return BaseHoc
}


