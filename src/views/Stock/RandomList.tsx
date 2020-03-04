import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import RandomListConfig from '@/config/StockAnalysis/RandomList'
import { getStockRandomList } from '@/apis/stock'

interface RandomListProps { 
  
}

class RandomList extends Component<RandomListProps, {}> {
  public state = {
  }
  public render () {    
    return <NormalList config={RandomListConfig} requestTarget={getStockRandomList}></NormalList>
  }
}


export default RandomList


