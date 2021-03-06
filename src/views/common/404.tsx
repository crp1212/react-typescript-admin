import React, { Component } from 'react'
import { Result, Button } from 'antd'
import HistoryOperate from '@/utils/history-operate'

class Common404 extends Component {
  public state = {
  }
  public onClick () {
    HistoryOperate.push({
      pathname: '/index'
    })
  }
  public render () {    
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={this.onClick}>回到首页</Button>}
    />
  }
}


export default Common404


