import React, { Component } from 'react'
import styles from './layout.less'
import LoadingCover from '@/components/LoadingCover'
import Icon from '@/components/Icon/Icon'
import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import HistoryOperate from '@/utils/history-operate'

interface SideBarProps { 
  routes: RoutePramas[];
}

class SideBar extends Component<SideBarProps, {}> {
  public state = {
    loading: false
  }
  public handleClick (val: ClickParam) {
    let pathname = val.key
    HistoryOperate.push({
      pathname
    })
  }
  public componentDidMount () {

  }
  public getMenuContent (routes: RoutePramas[]) { // 获取子菜单内容
    return routes.map((route) => {
      let children = route.children
      if (children && children.length > 0) {
        return this.getSubMenuContent(route)
      } else {
        return this.getMenuItemConent(route)
      }
    })
  }
  public getSubMenuContent (route: RoutePramas) {
    return <Menu.SubMenu key={route.path} title={
      <span className={styles.subMenu}>
        <Icon value="mzicon-setting" />
        { route.meta && route.meta.title }
      </span>
    }>
      {
        route.children ? this.getMenuContent(route.children) : ''
      }
    </Menu.SubMenu>
  }
  public getMenuItemConent (route: RoutePramas) {
    return <Menu.Item key={route.path} >
      {route.meta ? route.meta.title : ''}
      {/*  <Link to={route.path}></Link> */}
    </Menu.Item>
  }
  public menuItemClick (route: RoutePramas) {
    console.log(route)
  }
  public render () {
    return <aside className={styles.aside}>
      <LoadingCover loading={ this.state.loading }></LoadingCover>
      <div className={styles.asideContent}></div>
      <Menu
        onClick={this.handleClick}
        style={{ width: '100%' }}
        mode="inline"
        className={styles.menu}
      >
        {this.getMenuContent(this.props.routes)}
      </Menu>  
    </aside>
  }
}


export default SideBar


