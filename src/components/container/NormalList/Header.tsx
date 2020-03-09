import React, { Component } from 'react'
import styles from './NormalList.less'
import { getFormComponent } from '@/components/form/Index'
export interface HeaderConfig {
  list: NormalListUnitConfig[];
  rightList: NormalListUnitConfig[];
  query?: boolean; // 当为false的时候, header中值改变时不做query的hack操作
  rightListWidth?: string | number;
}
interface HeaderProps { 
  config: HeaderConfig;
  onAction: Function;
  tableConfig?: CommonObject;
}

class Header extends Component<HeaderProps, {}> {
  public state = {
  }
  public componentDidMount () {
    
  }
  public onAction = (option: any) => {
    let actionType = option.actionType
    let config = this.props.config
    if (actionType === 'change' && config.query !== false) { // change的操作检测, header默认改变是要查询的, 这里左一层修改
      option.actionType = 'query'
    }
    if (option.actionType === 'query' && Array.isArray(option.value)) { // 查询的action时, 由于列表是get请求, 数组格式value需要转化为合适的字符串
      option.value = option.value.join(option.arraySeparators || ',')
    }
    this.props.onAction(option)
  }
  public getRenderResultList (arr: NormalListUnitConfig[] = []) {
    return arr.map((config, index) => getFormComponent(config, index, this.onAction, {
      tableConfig: this.props.tableConfig
    }))
  }
  public render () {    
    let { list, rightList } = this.props.config
    return <div className={'rc-row ' + styles.header}>
      <div className={'rc-row ' + styles.headerItem}>
        { this.getRenderResultList(list) }
      </div>
      <div className={'rc-row ' + styles.headerItem}>
        { this.getRenderResultList(rightList) }
      </div>
    </div>
  }
}


export default Header


