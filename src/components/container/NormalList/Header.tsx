import React, { Component } from 'react'
import styles from './NormalList.less'
import { getFormComponent } from '@/components/form/Index'
interface HeaderConfig {
  list: NormalListUnitConfig[];
  rightList: NormalListUnitConfig[];
  rightListWidth?: string | number;
}
interface HeaderProps { 
  config: HeaderConfig;
}

class Header extends Component<HeaderProps, {}> {
  public state = {
  }
  public componentDidMount () {
    
  }
  public getRenderResultList (arr: NormalListUnitConfig[]) {
    return arr.map((config, index) => getFormComponent(config, index))
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


