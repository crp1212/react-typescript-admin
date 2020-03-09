import React, { Component } from 'react'
import { getStockOptionalList, requestStockOptionalListDel, requestStockForecastListAdd } from '@/apis/stock'
import SotckListView from '@/components/Stock/StockListView'
import { pickAppointKeyToNewObject } from '@/utils/index'
interface OptionalListProps { 
  
}

class OptionalList extends Component<OptionalListProps, {}> {
  public state = {
    
  }
  public getHeaderConfig (data: CommonObject) {
    let list: CommonObject = [
      { 
        UIType: 'Button', 
        actionType: 'request', 
        text: '删除', 
        type: 'primary',
        requestTarget: requestStockOptionalListDel,
        requestParam: pickAppointKeyToNewObject(data, ['stockName', 'code'])
      }
    ]
    if (!data.forecast) {
      list.push({
        UIType: 'Button',
        actionType: 'request',
        text: '加入预测',
        type: 'primary',
        requestTarget: requestStockForecastListAdd,
        requestParam: pickAppointKeyToNewObject(data, ['stockName', 'code'])
      })
    }
    return {
      list,
      rightList: []
    }
  }
  public render () {    
    return <SotckListView requestFn={getStockOptionalList} getHeaderConfig={this.getHeaderConfig}></SotckListView>
  }
}


export default OptionalList


