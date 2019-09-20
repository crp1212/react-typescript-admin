import React, { Component } from 'react'
import styles from './NormalList.less'
import { Table as AntdTable } from 'antd'
import LoadingCover from '@/components/LoadingCover'
interface TableConfig {
  tableHeader: CommonObject[];
  tableSize: 'default' | 'middle' | 'small';
}
interface TableProps { 
  config: TableConfig;
  tableData: CommonObject[];
  tableLoading: boolean;
  onAction: Function;
}
interface TableRef {
  initColumns(): any;
} 

class Table extends Component<TableProps, {}> implements TableRef {
  public state = {
    columns: []
  }
  public onClick (config: StringObject, row: any) { // row 是的列表单条数据
    this.props.onAction({
      ...config,
      row
    })
  }
  public getColumnsTypeItem (obj: CommonObject) {
    let type = obj.type
    let result
    let clickHandle = this.onClick
    let _this = this
    if (type === 'index') {
      result = {
        title: '#',
        dataIndex: '',
        render (value: any, record: any, index: number) {
          return index + 1
        }
      }
    } else if (type === 'operator') {
      result = {
        title: obj.label,
        render (value: any, record: any, index: number) {
          return <div className='text-btn-group'>
            { obj.operatorConfig.map((item: StringObject, index: number) =>  (<div key={index} onClick={clickHandle.bind(_this, item, record)}>{item.text}</div>))}
          </div>
        }
      }
    }
    return result
  }
  public renderListTableItem (list: CommonObject[]) { // 通过getListFn获得list数组
    return <div>
      { list.map((item, index) => <div key={index} style={item.style || {}}>{item.text}</div>) }
    </div>
  }
  public getNormalColumnsItem (obj: CommonObject) {
    let renderListTableItem = this.renderListTableItem
    let { keyMap, dealFunction, color, getListFn, list } = obj
    return {
      title: obj.label,
      dataIndex: obj.key,
      render (value: any, record: CommonObject) {
        let result = value
        let style = color ? { color } : {}
        if (dealFunction) { result = dealFunction(record) }
        if (keyMap) { result = keyMap[value] }
        if (getListFn || list) {
          let renderList = getListFn ? getListFn(record) : list
          return renderListTableItem(renderList)
        }
        return <div style={style}>{result}</div>
      }
    }
  }
  public initColumns (filterKeyMap?: BooleanObject) { // 初始化表格设置
    let headers = this.props.config.tableHeader
    if (filterKeyMap) { // 头部项过滤
      headers = headers.filter(obj => obj.type || filterKeyMap[obj.key])
    }
    let columns = headers.map((obj, index) => {
      let type = obj.type
      return type ? this.getColumnsTypeItem(obj) : this.getNormalColumnsItem(obj)
    })
    this.setState({
      columns
    })
  }
  public componentDidMount () {
    this.initColumns()
  }
  public getTableContent () {
    let columns = this.state.columns
    let dataSource = this.props.tableData || []
    let size = this.props.config.tableSize || 'small'
    if (columns.length === 0) { return '' }
    return <AntdTable  
      bordered
      columns={columns} 
      dataSource={dataSource} 
      size={size} 
      pagination={false} 
    ></AntdTable>  
  }
  public render () {    
    let tableContent = this.getTableContent()
    let tableLoading = this.props.tableLoading || false
    return <div className={styles.table}>
      <LoadingCover loading={tableLoading}></LoadingCover>  
      {tableContent}
    </div>
  }
}


export default Table


