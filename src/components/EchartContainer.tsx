import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

interface EchartContainerProps { 
  width?: number;
  height?: number;
  init: Function;
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
      console.log(el)
      this.el = el 
      this.props.init(this)
    }} style={this.getCustomStyle()}></div>
  }
}


export default EchartContainer


