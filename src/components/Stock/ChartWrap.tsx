import React, { Component } from 'react'
import EchartContainer from '@/components/EchartContainer'
import LoadingCover from '@/components/LoadingCover/index'
import { getStockDetail } from '@/apis/stock'
import styles from './Stock.less'
import { stockAverage } from '@/utils/stockCalculate'

interface ChartWrapProps { 
  code: string;
  watchStockDetail?: Function;
}
interface StockDetail extends CommonObject{
  result: CommonObject[];

}
class ChartWrap extends Component<ChartWrapProps, {}> {
  public state = {
    loading: false
  }
  public useDataToal: number = 100
  public priceLineVm: React.RefObject<CommonObject> | null = null
  public volumnLineVm: React.RefObject<CommonObject> | null = null
  public candlestickLineVm: React.RefObject<CommonObject> | null = null
  public priceLineInit (ref: React.RefObject<CommonObject> | null) {
    this.priceLineVm = ref
  }
  public volumnLineInit (ref: React.RefObject<CommonObject> | null) {
    this.volumnLineVm = ref
  }
  public candlestickLineInit (ref: React.RefObject<CommonObject> | null) {
    this.candlestickLineVm = ref
  }
  public componentDidMount () {
    if (this.props.code) {
      this.getStockDetail()
    }
  }
  public componentDidUpdate (prevProps: ChartWrapProps) {
    if (prevProps.code !== this.props.code) {
      // code更新就刷新信息
      this.getStockDetail()
    }
  }
  public async getStockDetail () {
    this.setState({loading: true})
    try {
      let detail = await getStockDetail({
        code: this.props.code
      })
      let data = {
        ...detail,
        result: detail.result || []
      }
      let lineOption = this.getPriceLineChartOption(data)
      let volumnOption = this.getVolumnLineChartOption(data)
      let candlestickOption = this.getCamdlestickChartOption(data)
      let emitStockDetail = this.props.watchStockDetail
      this.priceLineVm && this.priceLineVm.setOption(lineOption)
      this.volumnLineVm && this.volumnLineVm.setOption(volumnOption)
      this.candlestickLineVm && this.candlestickLineVm.setOption(candlestickOption)
      emitStockDetail && emitStockDetail(data)

    } catch (error) {
      console.log(error)
    }
    this.setState({loading: false})
  }
  public getAverage (arr: number[], total: number) {
    let average = (arr.slice(0, total).reduce((sum: number, val: number) => sum + val, 0) / total).toFixed(3)
    return Number(average)
  }
  public getPriceLineChartOption (data: StockDetail) { // 获取价格折线图的option
    // let total = this.useDataToal
    let total = data.result.length
    let maxTotal = Math.max(total, 100)
    let dataZoomStart = Math.floor(((maxTotal - 100) / maxTotal) * 100) + ''
    console.log(dataZoomStart)
    let priceList = data.result
    let closePriceList = priceList.map(val => val.close) // 收盘价集合
    let key = 'close'
    let mainData = priceList.slice(0).reverse().map((item: NumberObject) => item[key])
    let min = Math.min.apply(null, mainData) - 1
    console.log(stockAverage(5, closePriceList))
    let options = { 
      title: { text: '价格曲线' },
      xAxis: {
        data: data.dates.slice(0, total).reverse()
      },
      yAxis: { type: 'value', min },
      toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          start: dataZoomStart,
          end: '100',
        },
        {
          id: 'dataZoomX',
          type: 'inside',
          show:true,
          filterMode: 'filter'
        },
      ],
      series: [
        { data: mainData, type: 'line', name: '收盘价', symbolSize: 4 },
        {
          name: 'MA5',
          type: 'line',
          data: stockAverage(5, closePriceList).reverse(),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        /* { data: Array(total).fill(this.getAverage(closePriceList, 50)), type: 'line', name: '五十日平均线', symbolSize: 4 },
        { data: Array(total).fill(this.getAverage(closePriceList, 100)), type: 'line', name: '一百日平均线', symbolSize: 4 },
        { data: Array(total).fill(this.getAverage(closePriceList, 200)), type: 'line', name: '二百日平均线', symbolSize: 4 } */
      ],
      tooltip: { show: true, confine: true, trigger: 'axis' }
    }
    return options
  }
  public getVolumnLineChartOption (data: StockDetail) { // 获取交易量的折线图option
    let total = this.useDataToal
    let volumnList = data.volumn.map((item: number) => Math.floor(item / 1000))
    let mainData = volumnList.slice(0, total).reverse()
    let min = Math.min.apply(null, mainData) - 1
    let options = { 
      title: { text: '交易量' },
      xAxis: {
        data: data.dates.slice(0, total).reverse()
      },
      yAxis: { type: 'value', min },
      series: [
        { data: mainData, type: 'line', name: '当天交易量', symbolSize: 4 },
        { data: Array(total).fill(Math.floor(this.getAverage(volumnList, 50))), type: 'line', name: '五十日平均线', symbolSize: 4 },
        { data: Array(total).fill(Math.floor(this.getAverage(volumnList, 100))), type: 'line', name: '一百日平均线', symbolSize: 4 },
        { data: Array(total).fill(Math.floor(this.getAverage(volumnList, 200))), type: 'line', name: '二百日平均线', symbolSize: 4 }
      ],
      tooltip: { show: true, confine: true, trigger: 'axis' }
    }
    return options
  }
  public getCamdlestickChartOption (data: StockDetail) {
    let total = this.useDataToal
    let upColor = '#00da3c'
    let downColor = '#ec0000'
    let priceList = data.result
    console.log(priceList)
    let closePriceList = priceList.map(val => val.close) // 收盘价集合
    let acerage5List = stockAverage(5, closePriceList).slice(0, total).reverse()
    let acerage10List = stockAverage(10, closePriceList).slice(0, total).reverse()
    let acerage20List = stockAverage(20, closePriceList).slice(0, total).reverse()
    let acerage30List = stockAverage(30, closePriceList).slice(0, total).reverse()
    let candlestickList = data.result.slice(0, total).map((item, index) => {
      let dateOrigin = data.dates[index]
      let volumn = data.volumn[index]
      let date = `${dateOrigin.slice(0, 4)}-${dateOrigin.slice(4, 6)}-${dateOrigin.slice(6, 8)}`
      return [ item.open, item.close, item.low, item.high, volumn, item.gain + '%']
    }).reverse()
    let options = {
      backgroundColor: '#fff',
      animation: false,
      tooltip: { 
        show: true, 
        confine: true, 
        trigger: 'axis',
        formatter (params: CommonObject[]) {
          let data = params[0].data
          return `
            日期: ${params[0].axisValue}<br>
            开盘价: ${data[1]}<br>
            收盘价: ${data[2]}<br>
            最低价: ${data[3]}<br>
            最高价: ${data[4]}<br>
            涨跌幅: ${data[6]}
          `
        }
      },
      xAxis: {data: data.dates.slice(0, total).reverse()},
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        }
      ],
      series: [
        {
          name: data.name,
          type: 'candlestick',
          data: candlestickList,
          itemStyle: {
            color: downColor,
            color0: upColor,
            borderColor: null,
            borderColor0: null
          }
        }, 
        {
          name: 'MA5',
          type: 'line',
          data: acerage5List,
          smooth: true,
          symbolSize: 4,
          symbol: 'none', 
          lineStyle: {
            color: 'black'
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: acerage10List,
          smooth: true,
          symbolSize: 4,
          symbol: 'none', 
          lineStyle: {
            color: 'pink'
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: acerage20List,
          smooth: true,
          symbolSize: 4,
          symbol: 'none', 
          lineStyle: {
            color: 'green'
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: acerage30List,
          smooth: true,
          symbolSize: 4,
          symbol: 'none', 
          lineStyle: {
            color: 'red'
          }
        },
      ]
    }
    return options
  }
  public render () {    
    return <div className={'rc-row ' + styles['chart-wrap-container']} data-row-grow >
      <LoadingCover loading={this.state.loading}></LoadingCover>
      <EchartContainer width={600} height={400} init={this.priceLineInit.bind(this)} className='fl-sh'></EchartContainer> 
      <EchartContainer width={600} height={400} init={this.volumnLineInit.bind(this)} className='fl-sh'></EchartContainer> 
      <EchartContainer width={800} height={400} init={this.candlestickLineInit.bind(this)} className='fl-sh'></EchartContainer> 
    </div>
  }
}


export default ChartWrap


