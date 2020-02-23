import React, { Component } from 'react'
import { Table, Button, Select  } from 'antd'
import { getCacheData, setCacheData } from './list-cache'
import moment from 'moment'


interface ListProps { 
  
}
interface ListState {
  dataSource: CommonObject[];
  eyedropName: string;
}

class List extends Component<ListProps, {}> {
  public state: ListState = {
    dataSource: [],
    eyedropName: ''
  }
  public componentDidMount () {
    let data = getCacheData()
    if (data.length > 0) {
      this.setState({ dataSource: data})
    }
  }
  public addEyedrop () {
    let dataSource = this.state.dataSource.concat({
      eyedropName: this.state.eyedropName,
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.setState({dataSource})
    setCacheData(dataSource)
  }
  public handleChange (eyedropName: string) {
    console.log(eyedropName)
    this.setState({
      eyedropName
    })
  }
  public render () {
    let columns = [
      { title: '眼药水名', dataIndex: 'eyedropName', key: 'eyedropName', },
      { title: '时间', dataIndex: 'time', key: 'time', }
    ]
    const {Option} = Select
    return <div className="rc-col" data-full='1'>
      <div style={{padding: '16px 0'}}>
        <Select defaultValue="玻璃酸钠" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
          <Option value="玻璃酸钠">玻璃酸钠</Option>
          <Option value="典必殊">典必殊</Option>
          <Option value="美多丽">美多丽</Option>
        </Select>
        <Button type="primary" onClick={this.addEyedrop.bind(this)} style={{marginLeft: '16px'}}>添加</Button>
      </div>
      <Table dataSource={this.state.dataSource} columns={columns} />   
    </div>
  }
}


export default List


