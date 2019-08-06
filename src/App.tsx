import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import Login from '@/views/Login/Login'

interface AppProps { 
  b?: string
  isLogin: boolean
}
class App extends Component<AppProps, {}> {
  public state = {
    a: '2',
    pageLoading: true 
  }
  componentDidMount () {
    console.log(this.props.isLogin)
  }
  public render () {    
    return <div className="app-container">
      {
        this.props.isLogin ? <div>465465</div> : <Login /> 
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


