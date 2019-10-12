import React, { Component } from 'react'
import BaseHoc from './BaseHoc'
import { CommonProps } from './form.d'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

interface RadioGroupProps { 
  
}


class RadioGroup extends Component<CommonProps, {}> {
  public state = {
  }
  public onChange (e: RadioChangeEvent) {
    this.props.onChange({
      value: e.target.value
    })
  }
  public render () {    
    let { options, defaultValue } = this.props.config  
    return <Radio.Group
      options={options}
      onChange={this.onChange.bind(this)}
    ></Radio.Group>
  }
}


export default BaseHoc(RadioGroup)


