import React, { Component } from 'react'
import Styles from './Stock.less'
import {Input, DatePicker, Button} from 'antd'
import { errorNotify } from '@/utils/index'
import { getStockTransaction } from '@/apis/stock.ts'
import moment from 'moment'
import TransactionTable from '@/components/Stock/TransactionTable.tsx'
import TransactionHistory from '@/components/Stock/TransactionHistory.tsx'
import { addStockTransactionHistoryStorage, getStockTransactionHistoryStorage } from '@/storage/index'
interface TransactionAnalysisProps { 
  
}

class TransactionAnalysis extends Component<TransactionAnalysisProps, {}> {
  public state = {
    code: '002114', timeRange: '1', transactionData: [], sellTotal: 0, buyTotal: 0, limitVolumn: 500, time: moment()
  }
  public stockName: string = ''
  public historyRef: React.RefObject<CommonObject> | null = null
  public timeStr: string = moment().format('YYYY-MM-DD')
  public sourceData: StockTransactionItem[] = []
  public codeChange (e: React.ChangeEvent<HTMLInputElement>) {
    // this.setState({})
    let code = e.target.value
    this.setState({code})
  }
  public setStorage () {
    addStockTransactionHistoryStorage({
      timeStr: this.timeStr,
      code: this.state.code,
      timeRange: Number(this.state.timeRange),
      limitVolumn: this.state.limitVolumn,
      name: this.stockName
    })
  }
  public stockItemAddDate (arr: StockTransactionItem[], date: string) {
    arr.forEach(item => {
      item.time = date + ' ' + item.time
    })
    return arr
  }
  public componentWillMount () {
    let historyItem = getStockTransactionHistoryStorage()[0]
    console.log(historyItem)
    this.historyUpdate(historyItem)
  }
  public async startSearch () {
    let { code, timeRange } = this.state
    let timeStr = this.timeStr
    let errorMessage = ''
    if (!code) { 
      errorMessage = '请输入股票号码'
    } else if (!timeRange) {
      errorMessage = '请输入日期范围'
    } else if (!timeStr) {
      errorMessage = '请选择开始时间'
    }
    if (errorMessage) {
      errorNotify(errorMessage)
      return
    }
    try {
      let data = await getStockTransaction({code, timeStr, timeRange})
      this.sourceData = data.list.map((item: CommonObject) => this.stockItemAddDate(item.data, item.date)).reduce((result: StockTransactionItem[], arr: StockTransactionItem[]) => {
        result = result.concat(arr.slice(1, arr.length - 1))
        return result
      }, [])
      this.stockName = data.name
      this.limitFilter()
      this.setStorage()
    } catch (error) {
      console.log(error) 
    }
  }
  public timeChange (date) {
    this.timeStr = date.format('YYYY-MM-DD')
    this.setState({time: date})
  }
  public timeRangeChange (e: React.ChangeEvent<HTMLInputElement>) {
    let timeRange = e.target.value
    this.setState({timeRange})
    
  }
  public limitVolumnChange (e: React.ChangeEvent<HTMLInputElement>) {
    let limitVolumn = e.target.value
    this.setState({limitVolumn})
  }
  public limitFilter () {
    let limitVolumn = this.state.limitVolumn
    let transactionData = this.sourceData.filter((item: StockTransactionItem) => item.volumn > limitVolumn)
    this.setState({
      transactionData,
      sellTotal: transactionData.filter((item: StockTransactionItem) => item.type === '2').reduce((sum: number, item: StockTransactionItem) => sum + item.volumn, 0),
      buyTotal: transactionData.filter((item: StockTransactionItem) => item.type === '1').reduce((sum: number, item: StockTransactionItem) => sum + item.volumn, 0)
    })
  }
  public getHistoryRef (ref: React.RefObject<CommonObject> | null) {
    this.historyRef = ref
  }
  public historyUpdate (item: StockHistoryItem) {
    if (!item) { return }
    this.setState({
      code: item.code,
      timeRange: item.timeRange,
      limitVolumn: item.limitVolumn,
      time: moment(item.timeStr)
    }, () => {
      this.startSearch()
    })
    this.timeStr = item.timeStr
    
  }
  public render () {    
    let {code, timeRange, transactionData, limitVolumn, time } = this.state
    const dateFormat = 'YYYY-MM-DD'
    return <div className="rc-row grow-scroll">
      <div className={Styles['transaction-query'] + ' rc-col'}>
        <Input.Search
          placeholder="stock code"
          value={code}
          onSearch={this.startSearch.bind(this)}
          onChange={this.codeChange.bind(this)}
        />
        <div className="mt16 rc-row">
          <DatePicker onChange={this.timeChange.bind(this)} value={time} />
          <Input value={timeRange} onChange={this.timeRangeChange.bind(this)} style={{width: 40, marginLeft: 8}}></Input>
        </div>
        <Button type="primary" className="mt16" onClick={this.startSearch.bind(this)}>查询</Button>
        <div className="rc-row mt16">
          <Input
            placeholder="limit volumn"
            value={limitVolumn}
            onChange={this.limitVolumnChange.bind(this)}
          />
          <Button type="primary" className="ml16" onClick={this.limitFilter.bind(this)}>过滤</Button>
        </div>
        <TransactionHistory historyClick={this.historyUpdate.bind(this)}></TransactionHistory>
      </div>
      <div className={Styles['transaction-content']}>
        <TransactionTable tableData={transactionData}></TransactionTable>
        <div className="mt16">卖单总量: {this.state.sellTotal}</div>
        <div>买单总量: {this.state.buyTotal}</div>
      </div>
    </div>
  }
}


export default TransactionAnalysis


