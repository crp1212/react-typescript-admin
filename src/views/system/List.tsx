import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import getSystemListConfig from '@/config/system/list'

interface ListProps { 
  
}
let listConfig = getSystemListConfig()

class List extends Component<ListProps, {}> {
  public state = {
  }
  public render () {    
    // eslint-disable-next-line @typescript-eslint/camelcase
    return <NormalList config={listConfig} requestTarget='/backstage/user/select' defaultQuery={{is_admin: '1'}}></NormalList> 
  }
}


export default List


