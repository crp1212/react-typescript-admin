import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { generatorRoutesWithSubRoutes } from './index'
import { Alert } from 'antd'
export default function routeRender (routes: RoutePramas[]) {
  return <Switch>
    { routes.map((route) => generatorRoutesWithSubRoutes(route)) }
    <Route render={
      () => <Alert
        message="Error"
        description="无匹配路由"
        type="error"
        showIcon
      />
    } />
  </Switch>
}