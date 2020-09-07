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
    code: '002114', timeRange: '1', transactionData: [], sellTotal: 0, sellTotalMoney: 0, buyTotalMoney: 0, buyTotal: 0, limitVolumn: 500, time: moment(), timeList: [], timeOptionList: [], selectAll: true, loading: false
  }
  public stockName: string = ''
  public historyRef: React.RefObject<CommonObject> | null = null
  public timeStr: string = moment().format('YYYY-MM-DD')
  public sourceData: StockTransactionItem[] = []
  public requestData: TranscationRequestData = {}
  public priceInfoMap: CommonObject = {}
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
      item.clockTime = item.time
      item.time = date + ' ' + item.time
      
    })
    return arr
  }
  public componentWillMount () {
    let historyItem = getStockTransactionHistoryStorage()[0]
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
    }).map((item: CommonObject) => this.stockItemAddDate(item.data, item.date)).reduce((result: StockTransactionItem[], arr: StockTransactionItem[], transactionListIndex: number) => {
      let open: number = this.priceInfoMap[arr[0].time.split(' ')[0]].open
      result = result.concat(arr.filter(item => Number(item.clockTime.replace(/\:/g, '')) < 150000).slice(1, arr.length - 1).map((item, index) => ({
        ...item
      })))
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
      this.priceInfoMap = data.list.reduce((result: CommonObject, item: CommonObject) => {
        result[item.date] = item.priceInfo
        return result
      }, {})
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
  public getStatisticsInfo (data: StockTransactionItem[] ) {
    let sellTotal = 0
    let buyTotal = 0
    let sellTotalMoney = 0
    let buyTotalMoney = 0
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item.type === '2') {
        sellTotal += item.volumn
        sellTotalMoney += item.volumn * item.price
      } else if (item.type === '1') {
        buyTotal += item.volumn
        buyTotalMoney += item.volumn * item.price
      }
    }
    return {
      sellTotal, buyTotal, sellTotalMoney: sellTotalMoney.toFixed(2), buyTotalMoney: buyTotalMoney.toFixed(2)
    }
  }
  public limitFilter () {
    let limitVolumn = this.state.limitVolumn
    let transactionData = this.sourceData.filter((item: StockTransactionItem) => item.volumn > limitVolumn)
    let statisticsInfo = this.getStatisticsInfo(transactionData)
    this.setState({
      transactionData: transactionData.map(item => {
        let open: number = this.priceInfoMap[item.time.split(' ')[0]].prevClose // 获取上一个交易日收盘价
        return {
          ...item, 
          gain: (((item.price - open) / open) * 100).toFixed(2) + '%',
          comparePrev: item.change,
          comparePrevGain: ((item.change / open) * 100).toFixed(2) + '%',
        }
      }),
      ...statisticsInfo
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
        <div className="mt16">卖单总量: {this.state.sellTotal}, 总金额: {this.state.sellTotalMoney}</div>
        <div>买单总量: {this.state.buyTotal}, 总金额: {this.state.buyTotalMoney}</div>
      </div>
    </div>
  }
}


export default TransactionAnalysis


