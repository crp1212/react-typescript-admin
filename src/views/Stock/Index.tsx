import React, { Component } from 'react'
import {Input} from 'antd'
import ChartWrap from '@/components/Stock/ChartWrap'
import { errorNotify } from '@/utils/index'

interface IndexProps { 
  
}

class Index extends Component<IndexProps, {}> {
  public state = {
    stockName: '',
    code: '',
    searchCode: ''
  }
  public codeChange (e: React.ChangeEvent<HTMLInputElement>) {
    let code = e.target.value
    this.setState({code})
  }
  public startSearch () {
    let code = this.state.code
    if (code.length !== 6) { 
      errorNotify('无效的号码, 请检查是否正确')
      return
    }
    this.setState({ searchCode: code })
  }
  public watchStockDetail (data: CommonObject) {
    this.setState({ stockName: data.name })
  }
  public render () {    
    let {stockName, code, searchCode} = this.state
    return <div className='rc-col grow-scroll' style={{padding: '16px'}}>
      <div className='rc-row'>
        <Input.Search
          placeholder="stock code"
          value={code}
          onSearch={this.startSearch.bind(this)}
          onChange={this.codeChange.bind(this)}
          style={{ width: 600, margin: '16px auto' }}
        />
      </div>
      { stockName ? <div style={{textAlign: 'center', fontSize: '16px', marginBottom: '16px'}}>股票名称: {stockName}</div> : '' }
      <ChartWrap code={searchCode} watchStockDetail={this.watchStockDetail.bind(this)}> </ChartWrap> 
    </div>
  }
}


export default Index


