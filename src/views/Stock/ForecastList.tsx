import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import ForecastListConfig from '@/config/StockAnalysis/ForecastList'
import { getStockForecastList } from '@/apis/stock'

interface ForecastListProps { 
  
}

class ForecastList extends Component<ForecastListProps, {}> {
  public state = {
  }
  public render () {    
    return <NormalList config={ForecastListConfig} requestTarget={getStockForecastList}></NormalList>
  }
}


export default ForecastList


