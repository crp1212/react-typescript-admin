import React, { Component } from 'react'
import Header from './Header'
import Table from './Table'
import Pagination from './Pagination'
import styles from './NormalList.less'
import { isString, isFunction } from '@/utils/index'
import { fetch } from '@/apis/index'

interface NormalListProps { 
  config: NormalListConfig;
  requestTarget?: string | Function ; // string的时候是一个get请求的地址 Function则是直接调用获得返回值的
  defaultQuery?: StringObject; // 仅在requestTarget存在时有效
}

class NormalList extends Component<NormalListProps, {}> {
  public requestFn: any = null
  public queryOption: StringObject = {}
  public state = {
    tableLoading: true,
    tableData: []
  }
  public componentDidMount () { // 加载数据
    let requestTarget = this.props.requestTarget || this.props.config.requestTarget
    let request
    if (!requestTarget) {
      console.warn('没有请求数据的配置')
      return
    }
    if (isString(requestTarget)) {
      request = fetch('get', (requestTarget as string))
    }
    this.requestFn = request
    this.updateData()
  }
  public async updateData () { // 更新数据
    let defaultQuery = this.props.defaultQuery || {}
    let tableData = []
    try {
      let data = await this.requestFn({
        ...defaultQuery,
        ...this.queryOption
      })
      tableData = data.data.map((obj: any, index: number) => ({
        ...obj,
        key: index
      }))
    } catch (error) {
      
    }
    this.setState({
      tableData,
      tableLoading: false
    })
  }
  public render () {  
    let { tableData, tableLoading } = this.state
    let headerConfig = this.props.config.header  
    let tableConfig = this.props.config.table
    return <div className={'rc-col ' + styles.container}>
      <Header config={headerConfig}></Header>
      <Table config={tableConfig} tableData={tableData} tableLoading={tableLoading}></Table>
      <Pagination></Pagination>
    </div>
  }
}


export default NormalList


