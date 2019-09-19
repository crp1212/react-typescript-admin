import React, { Component } from 'react'
import { Select as AntdSelect } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
import { isString, isFunction } from '@/utils/index'
import { fetch } from '@/apis/index'

let { Option } = AntdSelect

interface SelectOption extends CommonProps {
  label: string;
  value: string | number;
}

class Select extends Component<CommonProps, {}> {
  public state = {
    loading: false,
    options: []
  }
  public componentDidMount () {
    this.initOptions()
  }
  public initRequestFn (requestTarget: string | Function | any) {
    let requestFn: Function | undefined
    if (isString(requestTarget)) {
      requestFn = fetch('get', (requestTarget as string))
    } else if (isFunction(requestTarget)) { // 直接配置的函数, 可直接使用
      requestFn = requestTarget
    } else {
      console.error('配置错误, async为true时需要的配置requestTarget', this.props.config)  
    }
    return requestFn
  }
  public async initOptions () { // 初始化select选项 
    let { async, requestTarget, requestFormat, options } = this.props.config
    let result = options || []
    if (async) { // 异步请求的标志
      let requestFn = this.initRequestFn(requestTarget)
      this.setState({ loading: true })
      if (!requestFn) { return }
      try {
        let data = await requestFn()
        result = result.concat(data.map((item: CommonObject) => ({
          label: requestFormat ? item[requestFormat.label] : item.label,
          value: requestFormat ? item[requestFormat.value] : item.value,
          ...item
        })))
      } catch (error) {
        
      }
    }
    this.setState({ 
      options: result,
      loading: false
    })
  }
  public getOptions (options: SelectOption[]) {
    let list = options || []
    return list.map((option) => {
      return <Option value={option.value} key={option.value}>{option.label}</Option>
    })
  }
  public onChange (value: string | number) {
    this.props.onChange({
      value
    })
  }
  public render () {   
    let { loading } = this.state
    let { value, placeholder } = this.props.config
    let { baseWidth } = this.props 
    return <AntdSelect 
      defaultValue={value} 
      placeholder={placeholder}
      style={{ width: baseWidth }}
      onChange={this.onChange.bind(this)}
      loading={loading}
    >
      { this.getOptions(this.state.options) }
    </AntdSelect>
  }
}


export default BaseHoc(Select)


