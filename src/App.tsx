import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Login from '@/views/Login/Login'

interface AppProps { 
  b?: string
  isLogin: boolean
}
class App extends Component<AppProps, {}> {
  public state = {
    a: '2'
  }
  componentDidMount () {
    console.log(this.props.isLogin)
  }
  public render () {    
    return <div className="app-container">
      {
        this.props.isLogin ? '' : <Login /> 
      }
    </div>
  }
}

const mapStateToProps = (state: any) => {
  let isLogin = state.root.isLogin
  return {
    isLogin
  }
}
const mapDispatchToProps = null

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App))


