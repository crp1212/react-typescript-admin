import React, { Component } from 'react'
import { routes, generatorRoutesWithSubRoutes } from '@/router/index'
import { Switch, Route } from 'react-router-dom'
import { Alert } from 'antd'
import styles from './layout.less'
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
      <Switch>
        { this.getCustomRoutes(routes) }
        <Route render={
          () => <Alert
            message="Error"
            description="无匹配路由"
            type="error"
            showIcon
          />
        } />
      </Switch>
    </div>
  }
}


export default Main


