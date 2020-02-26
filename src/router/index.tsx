import React from 'react'

import IndexPage from '@/views/Index/Index'
import LoadingPage from '@/views/Login/Login'
import Common404 from '@/views/common/404'
import Common403 from '@/views/common/403'
import Template from '@/views/template/index'
import { Route, Switch, Redirect } from 'react-router-dom'
import SystemRoute from './system'
import EyedropRoute from './eyedrop'

let commonRoutes: RoutePramas[] = [ // 通用路由, 所有用户都能有
  {
    path: '/',
    exact: true,
    to: '/index',
    hide: true
  },
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
    hide: true,
    customLayout: true
  }
]
let authRoutes = [
  // {
  //   path: '/test',
  //   exact: false,
  //   component: Template,
  //   meta: {
  //     title: '测试'
  //   },
  //   children: [
  //     {
  //       path: '/a',
  //       exact: true,
  //       hide: true,
  //       customLayout: true,
  //       meta: {
  //         title: 'a'
  //       },
  //       component: () => <div>a</div>
  //     },
  //     {
  //       path: '/v',
  //       exact: true,
  //       meta: {
  //         title: 'v'
  //       },
  //       component: () => <div>v</div>
  //     },
  //     {
  //       path: '/b',
  //       exact: true,
  //       hide: true,
  //       meta: {
  //         title: 'c'
  //       },
  //       component: () => <div>b</div>
  //     }
  //   ]
  // },
  // SystemRoute,
  EyedropRoute
]
let routesConfig: RoutePramas[] = [
  ...commonRoutes,
  ...authRoutes
]
let routesPathMapRouter: CommonObject = {} // 保存route的path和route配置的映射
let customRoutesPathMapRouter: CommonObject = {} // 保存custom route的path和route配置的映射
let commonRoutesPathMapRouter: CommonObject = {} // 保存common route的path和route配置的映射



function initRoutes (routes: RoutePramas[]) { // 对手写routeConfig做处理
  routes.forEach((item) => {
    routesPathMapRouter[item.path] = item
    let children = item.children
    if (!children) return
    children.forEach(child => {
      child.path = item.path + child.path
      child.parent = item
    })
    initRoutes(children)
  })
  return routes
}

export let routes = initRoutes(routesConfig)
export let customLayoutRoute: RoutePramas[] = [] // 不需要使用layout的router
export let commonLayoutRoute: RoutePramas[] = [] // 需要使用layout的router

function initLayoutRoute (routes: RoutePramas[]) {
  routes.forEach(function (route, index) {
    let isCustomTypeRoute = route.customLayout && route.hide
    if (isCustomTypeRoute) {// 使用自我布局并不存在于menu中
      customLayoutRoute.push(route)
      customRoutesPathMapRouter[route.path] = route
    } else {
      commonLayoutRoute.push(route)
      commonRoutesPathMapRouter[route.path] = route
      // 存在子属性是需要使用自定义布局的, 则需要抽出
      let children = route.children
      if (!children) { return }
      let newCommonRouteChildren = []
      let newCustomRouteChildren = []
      let routeCopy = { ...route } // 浅复制一份副本
      for (let i = 0; i < children.length; i++) {
        if (children[i].customLayout && children[i].hide) {
          newCustomRouteChildren.push(children[i])
        } else {
          newCommonRouteChildren.push(children[i])
        }
      }
      route.children = newCommonRouteChildren
      if (newCustomRouteChildren.length > 0) {
        customLayoutRoute.push(routeCopy)
        routeCopy.children = newCustomRouteChildren
        customRoutesPathMapRouter[route.path] = route
      }
    }
    
  })
  console.log('customLayoutRoute', customLayoutRoute)
  console.log(customRoutesPathMapRouter)
  console.log(commonRoutesPathMapRouter)
}
initLayoutRoute(routes)

export function generatorRoutesWithSubRoutes (route: RoutePramas) {
  return <Route path={route.path} exact={route.exact} key={route.path} render={ props => {
    if (route.unAuth) { return <Common403></Common403> }
    if (route.to) { // 支持重定向配置
      return <Redirect from={route.path} to={route.to} />
    }
    if (!route.component) { return '' }
    let Result: React.ComponentType<any> = route.component
    let children: RoutePramas[] = route.children || []
    let childrenRoutes = children.map((route, i) => generatorRoutesWithSubRoutes(route))
    return <Result>
      <Switch>
        { childrenRoutes }
        <Route render={props => <Common404></Common404> }></Route>
      </Switch>
    </Result>
  } }></Route>
}




export const getRouterMetaByPathname = (pathname: string) => {
  let meta: CommonObject = routesPathMapRouter[pathname].meta || {}
  return meta
}
export const judgeRouteIsCustomLayout = (pathname: string) => { // 判断路由的是否是自定义路由
  let route: RoutePramas = routesPathMapRouter[pathname]
  if (!route) { return void 0 } // 路由不存在的情况下, 应该人为是当前状态未知路由
  return !!route.customLayout
}
export const getRouterParent = (pathname: string) => {
  let parent = routesPathMapRouter[pathname] ? routesPathMapRouter[pathname].parent : {}
  return parent || {}
}
export const sideBarsRoutes = commonLayoutRoute.filter((item) => !item.hide) 
export const setRouteUnAuth = function (route: RoutePramas, authKeyMap: BooleanObject) { // 设置路由是否有权限
  console.log(route)
  route.unAuth = !authKeyMap[route.path]
}
export const setAuthRoutes = function (authKeyMap: BooleanObject) { // 传入权限路由后, 改变sideBarsRoutes
  sideBarsRoutes.forEach((route) => {
    setRouteUnAuth(route, authKeyMap)
    if (route.children) {
      route.children.forEach((route) => setRouteUnAuth(route, authKeyMap))
    }
  })
}
