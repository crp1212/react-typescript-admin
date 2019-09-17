import React, { Component } from 'react'
import { Pagination as AntdPagination } from 'antd'

interface PaginationConfig {
  pageSizes: string[];
  pageSize: number;
  pageKey: string;
  pageSizeKey: string;
}
interface PaginationProps { 
  config: PaginationConfig;
  total: number;
  onAction: Function;
}

class Pagination extends Component<PaginationProps, {}> {
  public state = {
    current: 1,
    pageSize: 10
  }
  public componentDidMount () {
    console.log(this.props.config)
  }
  public onShowSizeChange (current: number, pageSize: number) {
    this.updateState(current, pageSize )
  }
  public onChange (current: number, pageSize?: number) {
    this.updateState(current, pageSize )
  }
  public updateState (current: number, pageSize?: number) {
    this.setState({current, pageSize})
    let onAction = this.props.onAction
    let config = this.props.config
    onAction({
      actionType: 'query', 
      querys: [
        {
          key: config.pageKey,
          value: current
        },
        {
          key: config.pageSizeKey,
          value: pageSize
        }
      ]
    })
  }
  public render () {    
    let { current, pageSize } = this.state
    let { pageSizes } = this.props.config
    let total = this.props.total
    return <AntdPagination
      showSizeChanger
      showQuickJumper
      onShowSizeChange={this.onShowSizeChange.bind(this)}
      current={current}
      pageSize={pageSize}
      total={total}
      size='small'
      onChange={this.onChange.bind(this)}
      showTotal={(total) => `共 ${total} 条`}
      pageSizeOptions={pageSizes || ['10', '20', '30', '40']}
    />
  }
}


export default Pagination


