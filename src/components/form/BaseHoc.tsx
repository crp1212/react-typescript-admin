import React, { Component } from 'react'
import { CommonProps } from './form.d'



export default (WarppedComponent: React.ComponentType<CommonProps>) => {
  class BaseHoc extends Component<CommonProps, {}> {
    private static size = 'default'
    private static  width = '220'
    public state = {
    }
    public getStyle () {
      let width = this.props.config.width || this.props.width || BaseHoc.width
      return {
        width: width ? width + 'px' : ''
      }
    }
    public getComponentSize () {
      let size = this.props.config.size || BaseHoc.size // 配置里没有设定size, 那么使用BaseHoc得到的默认size
      return size
    }
    public onChange (obj: CommonObject) {
      let config = this.props.config
      console.log('通知change事件', {
        ...obj,
        key: config.key,
        config
      })
    }
    public onAction (obj: CommonObject) {
      console.log('通知action事件', obj)
    }
    private static getDerivedStateFromProps (props: any) {
      if (props.config.UIType === 'Button') {
        BaseHoc.width = ''
      }
      return null
    }
    public render () { // props的size可以覆盖默认的size
      let baseConfig = { // antd组件通用的一些配置
        size: this.getComponentSize(),
      }
      let wrapConfig = {
        ...this.props
      }
      return <div style={ this.getStyle() }>
        <WarppedComponent 
          {...wrapConfig}
          baseConfig={baseConfig}
          onChange={this.onChange.bind(this)}
          onAction={this.onAction.bind(this)}
        />
          
      </div>
    }
  }
  return BaseHoc
}


