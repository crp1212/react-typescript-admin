import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import ForecaseListConfig from '@/config/StockAnalysis/ForecaseList'
import { getStockForecaseList } from '@/apis/stock'

interface ForecaseListProps { 
  
}

class ForecaseList extends Component<ForecaseListProps, {}> {
  public state = {
  }
  public render () {    
    return <NormalList config={ForecaseListConfig} requestTarget={getStockForecaseList}></NormalList>
  }
}


export default ForecaseList


