import React, { Component } from 'react'
import BaseHoc from './BaseHoc'
import { CommonProps } from './form.d'
import { Checkbox } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

interface CheckboxGroupProps { 
  
}

class CheckboxGroup extends Component<CommonProps, {}> {
  public state = {
  }
  public onChange (value: CheckboxValueType[]) {
    this.props.onChange({
      value
    })
  }
  public render () {
    let { options, defaultValue } = this.props.config    
    return <Checkbox.Group 
      options={options} 
      defaultValue={defaultValue} 
      onChange={this.onChange.bind(this)}
    ></Checkbox.Group>
  }
}


export default BaseHoc(CheckboxGroup)


