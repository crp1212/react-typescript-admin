import React, { Component } from 'react'
import Header from './Header'
import Table from './Table'
import FormModal from './FormModal'
import Pagination from './Pagination'
import styles from './NormalList.less'
import { isString, clearEmptyProperty } from '@/utils/index'
import { fetch } from '@/apis/index'
import actionHandle from '@/utils/actionHandle'
import { ActionHandleParamParameter } from '@/utils/actionHandle'


interface NormalListProps { 
  config: NormalListConfig;
  requestTarget?: string | Function ; // string的时候是一个get请求的地址 Function则是直接调用获得返回值的
  defaultQuery?: StringObject; // 仅在requestTarget存在时有效
  onAction?: Function;
  externalTableData?: CommonObject[]; // 仅在没有requestTarget的时候有效
}

class NormalList extends Component<NormalListProps, {}> {
  public requestFn: any = null
  public formModalRef: any = null
  public tableRef: any;
  public queryOption: StringObject = {}
  public state = {
    tableLoading: false,
    tableData: [],
    total: 0
  }
  public componentDidMount () { // 加载数据
    if (this.props.externalTableData) {
      this.setState({
        tableData: this.props.externalTableData
      })
    } else {
      this.initRequestMode()
    }
    
  }
  public initRequestMode () { // 初始化表格数据请求模式
    this.setState({ tableLoading: true })
    let requestTarget = this.props.requestTarget || this.props.config.requestTarget
    let request
    if (!requestTarget) {
      console.warn('没有请求数据的配置')
      return
    }
    request = isString(requestTarget) ? fetch('get', (requestTarget as string)) : requestTarget
    this.requestFn = request
    this.updateData()
  }
  public async updateData () { // 更新数据
    this.setState({ tableLoading: true })
    let defaultQuery = this.props.defaultQuery || {}
    let tableData = []
    let total
    try {
      let data = await this.requestFn(clearEmptyProperty({
        ...defaultQuery,
        ...this.queryOption
      }))
      console.log(data)
      tableData = data.data.map((obj: any, index: number) => ({
        ...obj,
        key: index
      }))
      total = data.total
    } catch (error) {
      console.log(error)
    }
    this.setState({
      tableData,
      tableLoading: false,
      total
    })
  }
  public onActionHandle (parameter: ActionHandleParamParameter) {
    actionHandle({
      parameter,
      queryOption: this.queryOption,
      requestFn: this.updateData,
      context: this,
      handlers: {
        add: this.openDialog.bind(this),
        filter: this.tableFilter.bind(this)
      }
    })
    let onAction = this.props.onAction
    onAction && onAction(parameter)
  }
  public openDialog () {
    this.formModalRef.showModal()
  }
  public tableFilter (parameter: CommonObject) {
    let filterKeyMap = parameter.filterKeyMap
    this.tableRef.initColumns(filterKeyMap)
  }
  public render () {  
    let { tableData, tableLoading, total } = this.state
    let headerConfig = this.props.config.header  
    let tableConfig = this.props.config.table
    let formModalConfig = this.props.config.formConfig
    let paginationConfig = this.props.config.pagination
    return <div className={'rc-col ' + styles.container}>
      {
        headerConfig ? <Header config={headerConfig} onAction={this.onActionHandle.bind(this)} tableConfig={tableConfig}></Header> : ''
      }
      <Table config={tableConfig} tableData={tableData} tableLoading={tableLoading} onAction={this.onActionHandle.bind(this)} ref={(ref) => { this.tableRef = ref } }></Table>
      {
        paginationConfig ? <Pagination config={paginationConfig} total={total} onAction={this.onActionHandle.bind(this)}></Pagination> : ''
      }
      {
        formModalConfig ? <FormModal config={formModalConfig} onAction={this.onActionHandle.bind(this)} ref={(ref) => { this.formModalRef = ref } }></FormModal> : ''
      }
    </div>
  }
}


export default NormalList


