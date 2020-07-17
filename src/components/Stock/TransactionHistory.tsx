import React, { Component } from 'react'
import styles from './Stock.less'
import { watchHistoryChange, getStockTransactionHistoryStorage } from '@/storage/index'
interface TransactionHistoryProps { 
  historyClick: Function
}

class TransactionHistory extends Component<TransactionHistoryProps, {}> {
  /* 搜索历史列表 */
  public state = {
    list: []
  }
  public componentDidMount () {
    this.updateList()
    watchHistoryChange(() => {
      this.updateList()
    })
  }
  public updateList () {
    let list = getStockTransactionHistoryStorage()
    this.setState({ list })
  }
  public historyItemClick (item: StockHistoryItem) {
    let historyClick = this.props.historyClick
    historyClick && historyClick(item)
  }
  public render () {    
    return <div className={styles['transaction-history']}>
      { this.state.list.map((item: StockHistoryItem) => <div className='rc-row' key={item.code} onClick={() => { this.historyItemClick(item) }}>
        <div className='name'>{item.name}</div>
        <div className='number'>{item.code}</div>
      </div>) }
      
    </div>
  }
}


export default TransactionHistory


