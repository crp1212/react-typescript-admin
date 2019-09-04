import React, { Component } from 'react'
import { commonLayoutRoute as routes, generatorRoutesWithSubRoutes } from '@/router/index'
import styles from './layout.less'
import routeRender from '@/router/routerRender'
interface MainProps { 
  a?: string;
}

class Main extends Component<MainProps, {}> {
  public state = {
  }
  public getCustomRoutes (routes: RoutePramas[]) { // 生成配置的routes对应组件
    return routes.map((route) => generatorRoutesWithSubRoutes(route))
  }
  public render () {    
    return <div className={styles.main}>
      { routeRender(routes) }
    </div>
  }
}


export default Main


