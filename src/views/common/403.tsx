import React, { Component } from 'react'
import { Result, Button } from 'antd'
import HistoryOperate from '@/utils/history-operate'

class Common403 extends Component {
  public state = {
  }
  public onClick () {
    HistoryOperate.push({
      pathname: '/index'
    })
  }
  public render () {    
    return <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={this.onClick}>回到首页</Button>}
    />
  }
}


export default Common403


