import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import WorkUpdateConfig from '@/config/WorkUpdate/List'

interface ListProps { 
  
}
let workUpdateList = [
  { 
    key: '1', 
    title: '官网测试站', 
    updateUrl: 'http://121.40.178.51:9100/site/exec', 
    cacheUrl: 'http://121.40.178.51:9100/cache/flush'
  },
  { 
    key: '2', 
    title: 'crm测试站', 
    updateUrl: 'http://support.xair.cn/gitpull'
  },
  { 
    key: '3', 
    title: 'crm测试站', 
    updateUrl: 'http://121.40.178.51:8081/dev/exec'
  },
  {
    key: '4',
    title: 'xservice测试站',
    updateUrl: 'https://xservice.xair.cn/test/exec'
  }
]
class List extends Component<ListProps, {}> {
  public state = {
    externalTableData: workUpdateList
  }
  public render () {    
    return <NormalList config={WorkUpdateConfig} externalTableData={this.state.externalTableData}></NormalList>
  }
}


export default List


