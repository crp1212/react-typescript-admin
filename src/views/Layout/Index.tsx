import React, { Component } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Main from './Main'
import styles from './layout.less'
import { sideBarsRoutes, getRouterMetaByPathname } from '@/router/index'
import { ClickParam } from 'antd/lib/menu'
import HistoryOperate from '@/utils/history-operate'
import { openNewRouterPathByNewWindow } from '@/utils/open-window'
interface IndexProps { 
  
}

class Index extends Component<IndexProps, {}> {
  public state = {
  }
  public currentPath = ''
  public menuItemClick (val: ClickParam) {
    let pathname = val.key
    if (pathname === this.currentPath) { return }
    let meta = getRouterMetaByPathname(pathname)
    if (meta.newWindow) {
      openNewRouterPathByNewWindow(pathname)
    } else {
      HistoryOperate.push({
        pathname
      })
      this.currentPath = pathname
    }
    
  }
  public render () {
    return <>
      <Header></Header>
      <section className={styles.section}>
        <SideBar routes={sideBarsRoutes} menuItemClick={this.menuItemClick.bind(this)}></SideBar> 
        <Main></Main>
      </section>
    </>
  }
}


export default Index


