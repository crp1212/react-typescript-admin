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

interface AppProps { 
  isLogin: boolean;
  LogoutSuccessAction: Function;
}
class App extends Component<AppProps, {}> {
  public state = {
    a: '2',
    pageLoading: true 
  }
  private unWatch () {}
  public componentDidMount () {
    watchUnLogin(this.unLoginHandle.bind(this))
    this.unWatch = HistoryOperate.watch(this.routerChange.bind(this), true)
    this.initUserInfo()
  }
  public componentWillUnmount () {
    this.unWatch()
  }
  public unLoginHandle () {
    this.setState({
      pageLoading: false
    })
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
  }
  public async initUserInfo () {
    try {
      let data = await requestUserInfo()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      pageLoading: false
    })
  }

  public render () {    
    let {pageLoading} = this.state
    let MainContent= pageLoading ? '' : (this.props.isLogin ? <Layout />: <Login /> )
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


