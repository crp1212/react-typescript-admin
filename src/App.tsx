import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import Login from '@/views/Login/Login'
import Layout from '@/views/Layout/Index'
import HistoryOperate, { HistoryChangeParams } from '@/utils/history-operate'

interface AppProps { 
  isLogin: boolean;
}
class App extends Component<AppProps, {}> {
  public state = {
    a: '2',
    pageLoading: true 
  }
  private unWatch () {}
  public componentDidMount () {
    this.unWatch = HistoryOperate.watch(this.routerChange)
  }
  public componentWillUnmount () {
    this.unWatch()
  }
  public routerChange (routeParams: HistoryChangeParams) { // 路由变化通知
    // console.log(routeParams)
  }

  public render () {    
    return <div className="app-container">
      {
        this.props.isLogin ? <Layout />: <Login /> 
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
const mapDispatchToProps = null

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))


