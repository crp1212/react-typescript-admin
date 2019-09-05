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
}

class Table extends Component<TableProps, {}> {
  public state = {
    columns: []
  }
  public onClick (config: StringObject, item: any) {
    console.log(config, item)
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
  public getNormalColumnsItem (obj: CommonObject) {
    let { keyMap } = obj
    return {
      title: obj.label,
      dataIndex: obj.key,
      render (value: any) {
        if (keyMap) { return keyMap[value] }
        return value
      }
    }
  }
  public initColumns () { // 初始化表格设置
    let columns = this.props.config.tableHeader.map((obj, index) => {
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


