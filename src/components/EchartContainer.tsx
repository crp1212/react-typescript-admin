import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/candlestick'

// 引入提示框和标题组件
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/dataZoomInside'
import 'echarts/lib/component/dataZoomSlider'

interface EchartContainerProps { 
  width?: number;
  height?: number;
  init: Function;
  className?: string;
}

class EchartContainer extends Component<EchartContainerProps, {}> {
  public state = {
  }
  public el: HTMLDivElement | null= null
  public myChart: echarts.ECharts| null = null
  public getCustomStyle () {
    let width = this.props.width || 200
    let height = this.props.height || 200
    return {
      width: width + 'px',
      height: height + 'px'
    }
  }
  public componentDidMount () {
    if (!this.el) { return }
    this.myChart = echarts.init(this.el)
    
  }
  public setOption (options: CommonObject) {
    if (!this.myChart) { return }
    this.myChart.setOption(options)
  } 
  public render () {    
    return <div ref={(el) => { 
      this.el = el 
      this.props.init(this)
    }} style={this.getCustomStyle()} className={this.props.className || ''}></div>
  }
}


export default EchartContainer


