import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { generatorRoutesWithSubRoutes } from './index'
import Common404 from '@/views/common/404'
export default function routeRender (routes: RoutePramas[]) {
  return <Switch>
    { routes.map((route) => generatorRoutesWithSubRoutes(route)) }
    <Route render={
      () => <Common404></Common404> 
    } />
  </Switch> 
}