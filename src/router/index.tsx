import React from 'react'
import CommonSuspenseContianer from '@/components/CommonSuspenseContianer'
import IndexPage from '@/views/Index/Index'
import LoadingPage from '@/views/Login/Login'
import Template from '@/views/template/index'
import { Route, RouteComponentProps } from 'react-router-dom'

function formatRoutes (routes: RoutePramas[]) {
  routes.forEach((item) => {
    let children = item.children
    if (!children) return
    children.forEach(child => {
      child.path = item.path + child.path
    })
    formatRoutes(children)
  })
  return routes
}
export let routes = formatRoutes([
  {
    path: '/index',
    exact: true,
    component: IndexPage,
    hide: true
  },
  {
    path: '/login',
    exact: true,
    component: LoadingPage,
    hide: true
  },
  {
    path: '/test',
    exact: false,
    component: Template,
    meta: {
      title: '测试'
    },
    children: [
      {
        path: '/a',
        exact: true,
        meta: {
          title: 'a'
        },
        component: () => <div>a</div>
      },
      {
        path: '/v',
        exact: true,
        meta: {
          title: 'v'
        },
        component: () => <div>v</div>
      },
      {
        path: '/b',
        exact: true,
        meta: {
          title: 'c'
        },
        component: () => <div>b</div>
      }
    ]
  }
])

export function generatorRoutesWithSubRoutes (route: RoutePramas) {
  return <Route path={route.path} exact={route.exact} key={route.path} render={ props => {
    let Result = route.component
    let children: RoutePramas[] = route.children || []
    let childrenRoutes = children.map((route, i) => generatorRoutesWithSubRoutes(route))
    return <Result>
      { childrenRoutes }
    </Result>
  } }></Route>
}
export function routeRender (props: RouteComponentProps, route: RoutePramas) {
  let Result = route.component
  let children: RoutePramas[] = route.children || []
  let childrenRoutes = children.map((route, i) => generatorRoutesWithSubRoutes(route))

  return <Result>
    { childrenRoutes }
  </Result>
}
export const sideBarsRoutes = routes.filter((item) => !item.hide) 