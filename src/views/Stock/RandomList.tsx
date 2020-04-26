import React, { Component } from 'react'
import { getStockRandomList, requestStockOptionalListAdd, updateStockRandomList } from '@/apis/stock'
import SotckListView from '@/components/Stock/StockListView'
import { pickAppointKeyToNewObject } from '@/utils/index'

interface RandomListProps { 
  
}

class RandomList extends Component<RandomListProps, {}> {
  public state = {
  } 
  public getHeaderConfig (data: CommonObject) {
    let list: CommonObject = [
      { UIType: 'Button', actionType: 'request', text: '重新随机', type: 'primary', requestTarget: updateStockRandomList }
    ]
    if (!data.isOptional) {
      list.push({
        UIType: 'Button',
        actionType: 'request',
        text: '加自选',
        type: 'primary',
        requestTarget: requestStockOptionalListAdd,
        requestParam: pickAppointKeyToNewObject(data, ['stockName', 'code'])
      })
    }
    return {
      list,
      rightList: []
    }
  }
  public render () {    
    return <SotckListView requestFn={getStockRandomList} getHeaderConfig={this.getHeaderConfig}></SotckListView>
  }
}


export default RandomList


