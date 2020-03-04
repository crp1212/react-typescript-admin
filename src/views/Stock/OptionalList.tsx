import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import OptionalListConfig from '@/config/StockAnalysis/OptionalList'
import { getStockOptionalList } from '@/apis/stock'

interface OptionalListProps { 
  
}

class OptionalList extends Component<OptionalListProps, {}> {
  public state = {
  }
  public render () {    
    return <NormalList config={OptionalListConfig} requestTarget={getStockOptionalList}></NormalList>
  }
}


export default OptionalList


