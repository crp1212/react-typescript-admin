import React, { Component } from 'react'
import { Select as AntdSelect } from 'antd'
import { CommonProps } from './form.d'
import BaseHoc from './BaseHoc'
import { isString, isFunction, clearEmptyProperty, debouce } from '@/utils/index'
import { fetch } from '@/apis/index'

let { Option } = AntdSelect

interface SelectConfig { // Select配置说明
  mode?: ['multiple', 'tags']; // 是否启用的muliple和tags模式
}
interface SelectOption extends CommonProps {
  label: string;
  value: string | number;
}

class Select extends Component<CommonProps, {}> {
  public requestFn: Function | null | undefined = null
  public state = {
    loading: false,
    options: []
  }
  public componentDidMount () {
    let { firstSearch, requestTarget } = this.props.config 
    this.initRequestFn(requestTarget)
    if (firstSearch !== false) {
      this.initOptions()
    }
  }
  public initRequestFn (requestTarget: string | Function | any) {
    let requestFn: Function | undefined
    if (isString(requestTarget)) {
      requestFn = fetch('get', (requestTarget as string))
    } else if (isFunction(requestTarget)) { // 直接配置的函数, 可直接使用
      requestFn = requestTarget
    }
    this.requestFn = requestFn
  }
  public async initOptions () { // 初始化select选项 
    let { async, options } = this.props.config
    if (async) { // 异步请求的标志
      if (!this.requestFn) {
        console.error('配置错误, async为true时需要的配置requestTarget', this.props.config)  
        return
      }
      this.fetchData()
    } else {
      this.setState({ options })
    }
  }
  public async fetchData (parameter?: StringObject) { // 获取内容并更新
    let { requestFormat, options } = this.props.config
    let result = options || []
    console.log(parameter)
    if (!this.requestFn) { return }
    this.setState({ loading: true })
    try {
      let data = await this.requestFn(clearEmptyProperty(parameter))
      
      result = result.concat(data.map((item: CommonObject) => {
        let result = {
          ...item
        }
        if (requestFormat) {
          Object.keys(requestFormat).forEach(key => {
            result[key] = item[requestFormat[key]]
          })
        }
        return result
      }))
      console.log(result)
    } catch (error) {
      console.log(error)
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
  public getSelectedRelateOption (result: string) { // 获取对应选中option
    return  this.state.options.filter((item: SelectOption) => item.value === result)[0]
  }
  public onChange (result: string | number | string[] | number[]) {
    let { key } = this.props.config
    let value: any
    if (Array.isArray(key)) {
      let obj = this.getSelectedRelateOption(result as string) // 如果是多选的这里该怎么处理?
      value = key.map(val => obj[val])
    } else {
      value = result
    }
    this.props.onChange({
      value
    })
  }
  public onSearch = debouce((val: string) => {
    let { searchKey, emptyRequest } = this.props.config
    if (!val && !emptyRequest) { return } // 如果设置了emptyRequest则在空值的时候会触发search事件
    let parameter = {
      [searchKey]: val
    }
    this.fetchData(parameter)
  }, 500)
  public render () {   
    let { loading } = this.state
    let { value, placeholder, mode, showSearch } = this.props.config
    let { baseWidth } = this.props 
    return <AntdSelect 
      defaultValue={value} 
      placeholder={placeholder}
      style={{ width: baseWidth }}
      onChange={this.onChange.bind(this)}
      loading={loading}
      mode={mode}
      filterOption={!showSearch}
      showSearch={showSearch}
      onSearch={this.onSearch.bind(this)}
    >
      { this.getOptions(this.state.options) }
    </AntdSelect>
  }
}


export default BaseHoc(Select)


