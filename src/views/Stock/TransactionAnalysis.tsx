import React, { Component } from 'react'
import Styles from './Stock.less'
import {Input, DatePicker, Button, Checkbox} from 'antd'
import { errorNotify } from '@/utils/index'
import { getStockTransaction } from '@/apis/stock.ts'
import moment from 'moment'
import TransactionTable from '@/components/Stock/TransactionTable.tsx'
import TransactionHistory from '@/components/Stock/TransactionHistory.tsx'
import { addStockTransactionHistoryStorage, getStockTransactionHistoryStorage } from '@/storage/index'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
interface TransactionAnalysisProps { 
  
}
interface TranscationRequestDataListItem {
  data: StockTransactionItem[],
  date: string
}
interface TranscationRequestData {
  list?: TranscationRequestDataListItem[],
  name?: string
}

class TransactionAnalysis extends Component<TransactionAnalysisProps, {}> {
  public state = {
    code: '002114', timeRange: '1', transactionData: [], sellTotal: 0, buyTotal: 0, limitVolumn: 500, time: moment(), timeList: [], timeOptionList: [], selectAll: true, loading: false
  }
  public stockName: string = ''
  public historyRef: React.RefObject<CommonObject> | null = null
  public timeStr: string = moment().format('YYYY-MM-DD')
  public sourceData: StockTransactionItem[] = []
  public requestData: TranscationRequestData = {}
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
      if (item.time.indexOf(date) !== -1) { return }
      item.time = date + ' ' + item.time
    })
    return arr
  }
  public componentWillMount () {
    let historyItem = getStockTransactionHistoryStorage()[0]
    console.log(historyItem)
    this.historyUpdate(historyItem)
  }
  public updateSourceData (timeList?: (string | number | boolean) []) {
    timeList = timeList || this.state.timeList || []
    if (!this.requestData.list || !timeList) {
      this.sourceData = []
      return
    }
    this.sourceData = this.requestData.list.filter((item: TranscationRequestDataListItem) => {
      let date = item.date
      return timeList.indexOf(date) !== -1
    }).map((item: CommonObject) => this.stockItemAddDate(item.data, item.date)).reduce((result: StockTransactionItem[], arr: StockTransactionItem[]) => {
      result = result.concat(arr.slice(1, arr.length - 1))
      return result
    }, [])
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
      this.setState({loading: true})
      let data = await getStockTransaction({code, timeStr, timeRange})
      this.requestData = data
      this.state.timeList = data.list.map((item: CommonObject) => item.date)
      this.state.timeOptionList = [...this.state.timeList]
      this.state.selectAll = true
      this.updateSourceData()
      this.stockName = data.name
      this.limitFilter()
      this.setStorage()
    } catch (error) {
      console.log(error) 
    }
    this.setState({loading: false})
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
  public timeCheckboxChange (timeList: CheckboxValueType[]) {
    this.setState({ timeList })
    this.updateSourceData(timeList)
    this.limitFilter()
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
  public selectAllChange (e) {
    let selectAll = e.target.checked 
    console.log('selectAll', selectAll)
    let timeList = selectAll ? [...this.state.timeOptionList] : []
    this.setState({ 
      selectAll,
      timeList
    })
    this.updateSourceData(timeList)
    this.limitFilter()
  }
  public render () {    
    let {code, timeRange, transactionData, limitVolumn, time, timeList, timeOptionList, selectAll, loading } = this.state
    console.log('render', loading)
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
        <div className={Styles['checkbox-group']}>
          { timeOptionList.length > 1 ? <Checkbox checked={selectAll} onChange={ this.selectAllChange.bind(this) }>全选</Checkbox> : '' }
          <Checkbox.Group options={timeOptionList} value={timeList} onChange={this.timeCheckboxChange.bind(this)} />
        </div>
        <TransactionHistory historyClick={this.historyUpdate.bind(this)}></TransactionHistory>
      </div>
      <div className={Styles['transaction-content']}>
        <TransactionTable tableData={transactionData} loading={loading}></TransactionTable>
        <div className="mt16">卖单总量: {this.state.sellTotal}</div>
        <div>买单总量: {this.state.buyTotal}</div>
      </div>
    </div>
  }
}


export default TransactionAnalysis


