import React, { Component } from 'react'
import { Table } from 'antd'
import styles from './Stock.less'
interface TransactionTableProps { 
  tableData: StockTransactionItem[],
  loading: boolean
}

let typeColor: StringObject = {
  '1': '#F56C6C',
  '2': '#67C23A',
  '3': '#1d1d1f'
}
let columns = [
  { title: '时间', dataIndex: 'time', key: 'time', width: 200 },
  { 
    title: '价格', 
    dataIndex: 'price', 
    key: 'price', 
    width: 80,
    sorter: (a:StockTransactionItem, b:StockTransactionItem) => a.price - b.price,
    sortDirections: ['descend', 'ascend'], 
  },
  { 
    title: '明细', 
    dataIndex: 'volumn', 
    key: 'volumn', 
    sorter: (a:StockTransactionItem, b:StockTransactionItem) => a.volumn - b.volumn,
    sortDirections: ['descend', 'ascend'],
    render: (value: number, record: StockTransactionItem) => <div style={{color: typeColor[record.type]}}>{record.volumn}</div>
  },
  { title: '涨幅', dataIndex: 'gain', key: 'gain', width: 80 },
  { title: '较上次变化', dataIndex: 'comparePrev', key: 'comparePrev', width: 120 },
  { title: '较上次涨幅', dataIndex: 'comparePrevGain', key: 'comparePrevGain', width: 120 },
]
class TransactionTable extends Component<TransactionTableProps, {}> {
  public state = {
  }
  public shouldComponentUpdate (prevProps: TransactionTableProps) {
    return prevProps.tableData !== this.props.tableData || prevProps.loading !== this.props.loading
  }
  public render () {    
    let tableData = this.props.tableData
    let loading = this.props.loading
    return <Table loading={loading} className={styles['transaction-table']} dataSource={tableData} columns={columns} pagination={false} size='small' scroll={{y: 500}}></Table>
  }
}


export default TransactionTable


