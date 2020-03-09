import React, { Component } from 'react'
import LoadingWrap from '@/components/LoadingCover/wrap'
import ChartWarp from '@/components/Stock/ChartWarp'
import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import styles from './Stock.less'
import Header, {HeaderConfig} from '@/components/container/NormalList/Header'
import actionHandle, {ActionHandleParamParameter} from '@/utils/actionHandle'
interface StockListNormalState extends CommonObject{
  stockList: CommonObject[];
  hedaerConfig: HeaderConfig;
}
interface StockListViewProps { 
  requestFn: Function;
  getHeaderConfig?: Function;
}

class StockListView extends Component<StockListViewProps, {}> {
  public state: StockListNormalState = {
    stockList: [],
    loading: true,
    selectedKeys: [],
    code: '',
    hedaerConfig: {list: [], rightList: []}
  }
  public stockCodeMap: CommonObject = {}

  public menuClick ({ item, key, keyPath, domEvent }: ClickParam) {
    let code = this.stockCodeMap[key].code
    this.setState({selectedKeys: [key], code, hedaerConfig: this.getHeaderConfig(this.stockCodeMap[key])})
  }
  public getHeaderConfig (data: CommonObject) {
    if (!this.props.getHeaderConfig || !data) { return this.state.hedaerConfig }
    return this.props.getHeaderConfig(data)
  }
  public componentDidMount () {
    this.initOptionListData()
  }
  public async initOptionListData () {
    this.setState({ loading: true })
    try {
      let data = await this.props.requestFn({p: 1, psize: 100})
      this.stockCodeMap = data.data.reduce((result: CommonObject, item: CommonObject) => {
        result[item.code] = item
        return result
      }, {})
      let list = data.data
      let selectItem = this.getSelectItem(list) || {}
      let {code} = selectItem
      let selectedKeys = [code]
      this.setState({ stockList: list, selectedKeys, code, hedaerConfig: this.getHeaderConfig(list[0]) })
    } catch (error) {
      console.log(error)
    }
    this.setState({ loading: false })
  }
  public getSelectItem (list: CommonObject[]) {
    let code = this.state.selectedKeys[0]
    if (!code) { return list[0] }
    if (list.map(item => item.code).indexOf(code) === -1) { // 已经被删除
      return list[0]
    } else {
      return { code }
    }
  }
  public async headerAction (config: ActionHandleParamParameter) {
    await actionHandle({ parameter: config })
    this.initOptionListData()
  }
  public render () {    
    let {stockList, loading, hedaerConfig} = this.state
    return <LoadingWrap className="rc-row grow-scroll" loading={loading}>
      <div className={styles['list-sidebar']}>
        <Menu 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          className={styles['list-sidebar-menu']} 
          onClick={this.menuClick.bind(this)}
          selectedKeys={this.state.selectedKeys}
        >
          { stockList.map(item => <Menu.Item key={item.code}> <span>{item.stockName}</span> </Menu.Item>) }
        </Menu>
        
      </div>
      <div className={styles['echarts-container'] + ' rc-col'} data-row-grow>
        { hedaerConfig ? <Header config={hedaerConfig} onAction={this.headerAction.bind(this)}></Header> : ''}
        <ChartWarp code={this.state.code}></ChartWarp>  
      </div>
    </LoadingWrap>
  }
}


export default StockListView


