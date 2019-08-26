import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import Login from '@/views/Login/Login'
import Layout from '@/views/Layout/Index'
import HistoryOperate, { HistoryChangeParams } from '@/utils/history-operate'
import LoadingCover from '@/components/LoadingCover'
import { requestUserInfo } from '@/apis/common'
import { watchUnLogin } from '@/apis/index'
import { LogoutSuccessAction } from '@/store/login/action'
import { judgeRouteIsCustomLayout, customLayoutRoute } from '@/router/index'
import routeRender from '@/router/routerRender.tsx'
 
interface AppProps { 
  isLogin: boolean;
  LogoutSuccessAction: Function;
}
class App extends Component<AppProps, {}> {
  public state = {
    a: '2',
    pageLoading: true,
    useLayout: true,
    isCustomLayout: true
  }
  private unWatch () {}
  public componentDidMount () {
    console.log('didMount')
    watchUnLogin(this.unLoginHandle.bind(this))
    this.unWatch = HistoryOperate.watch(this.routerChange.bind(this), true)
    this.initUserInfo()
  }
  public componentWillUnmount () {
    this.unWatch()
  }
  public unLoginHandle () {
    this.hidePageLoading()
    this.props.LogoutSuccessAction()
    let currentPath = HistoryOperate.getPathname()
    if (currentPath !== '/login') {
      HistoryOperate.push({
        pathname: '/login'
      })
    }
    
  }
  public routerChange (routeParams: HistoryChangeParams) { // 路由变化通知
    let { pathname } = routeParams
    if (pathname === '/login') { // 如果是登录页面
      this.props.LogoutSuccessAction()
    }
    let isCustomLayout = judgeRouteIsCustomLayout(pathname)
    if (isCustomLayout !== this.state.isCustomLayout) {
      this.setState({
        isCustomLayout
      })
    }
  }
  public hidePageLoading () {
    if (this.state.pageLoading) {
      this.setState({
        pageLoading: false
      })
    }
  }
  public async initUserInfo () {
    try {
      let data = await requestUserInfo()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    this.hidePageLoading()
  }
  public render () {    
    let { isCustomLayout, pageLoading } = this.state
    let MainContent= pageLoading ? '' : (isCustomLayout ? routeRender(customLayoutRoute) : <Layout /> )
    return <div className="app-container">
      <LoadingCover loading={pageLoading}></LoadingCover>  
      {
        MainContent
      }
    </div>
  }
}

const mapStateToProps = (state: any) => {
  let isLogin = state.Login.isLogin
  return {
    isLogin
  }
}
const mapDispatchToProps = {
  LogoutSuccessAction
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))


