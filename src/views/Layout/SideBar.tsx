import React, { Component } from 'react'
import styles from './layout.less'
import LoadingCover from '@/components/LoadingCover'
import Icon from '@/components/Icon/Icon'
import { Menu, Tooltip, Button } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import HistoryOperate, { HistoryChangeParams } from '@/utils/history-operate'
import { sideBarsRoutes, getRouterMetaByPathname, getRouterParent } from '@/router/index'
import { openNewRouterPathByNewWindow } from '@/utils/open-window'


/* interface SideBarProps { 
  
} */
function getToolTips (collapsed: boolean) {
  return collapsed ? '展开菜单' : '收缩菜单'
}
let unWatch: Function
class SideBar extends Component {
  public state = {
    loading: false,
    selectedKeys: [''],
    openKeys: [''],
    collapsed: false,
    asideWidth: '208px',
    toolTips: getToolTips(false)
  }
  public currentPath = ''
  public componentDidMount () {
    unWatch = HistoryOperate.watch(this.routerChange.bind(this), true)
  }
  public routerChange (routeParams: HistoryChangeParams) {
    let { pathname } = routeParams
    let parent = getRouterParent(pathname)
    this.currentPath = pathname
    this.setState({
      selectedKeys: [pathname],
      openKeys: [parent.path]
    })
  }
  public componentWillUnmount () {
    unWatch()
  }
  
  public onOpenChange (openKeys: string[]) {
    this.setState({
      openKeys
    })
  }
  public menuWidthChange () {
    let collapsed = !this.state.collapsed
    this.setState({
      collapsed,
      openKeys: collapsed ? [] : [getRouterParent(this.currentPath).path], // 不自动展开是为了让动画不会突兀
      asideWidth: collapsed ? '80px' : '208px',
      toolTips: getToolTips(collapsed)
    })
  }
  public handleClick (val: ClickParam) {
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
  public getMenuContent (routes: RoutePramas[]) { // 获取子菜单内容
    if (this.state.loading) {
      return ''
    }
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
    let collapsed = this.state.collapsed
    if (route.unAuth) { // 没有权限的不显示
      return ''
    }
    return <Menu.SubMenu key={route.path} title={
      <span className={styles.subMenu}>
        <Icon value="mzicon-setting"/>
        { collapsed ? '' : <span className="ml10">{ route.meta && route.meta.title }</span> }
      </span>
    }>
      {
        route.children ? this.getMenuContent(route.children) : ''
      }
    </Menu.SubMenu>
  }
  public getMenuItemConent (route: RoutePramas) {
    if (route.unAuth) { // 没有权限的不显示
      return ''
    }
    return <Menu.Item key={route.path}>
      {route.meta ? route.meta.title : ''}
      {/*  <Link to={route.path}></Link> */}
    </Menu.Item>
  }
  public render () {
    let IconAttrs = {
      'data-mode': this.state.collapsed ? 'right' : ''
    }
    return <aside className={styles.aside} style={{width: this.state.asideWidth}}>
      <LoadingCover loading={ this.state.loading }></LoadingCover>
      <Menu
        onClick={this.handleClick.bind(this)}
        style={{ width: '100%' }}
        mode="inline"
        className={styles.menu}
        selectedKeys={this.state.selectedKeys}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange.bind(this)}
        inlineCollapsed={this.state.collapsed}
      >
        {this.getMenuContent(sideBarsRoutes)}
      </Menu>  
      <div className={styles.footer}>
        <Tooltip placement="top" title={this.state.toolTips}>
          <Icon value="xiangzuo" size={20} className={styles.collapseBtn} attrs={IconAttrs} onClick={ this.menuWidthChange.bind(this) }/>
        </Tooltip>
      </div>
    </aside>
  }
}


export default SideBar


