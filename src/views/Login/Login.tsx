import React, { Component } from 'react'
import LoginBg from '@/assets/image/33-hd.jpg'
import styles from './Login.less'
import { Dispatch } from 'redux'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { loginFlow } from '@/store/login/flow'
import { push as routerPush } from '@/utils/history-operate'
import { initCommonInfo } from '@/init'
 
interface LoginProps { 
  LoginFlowFn: (option: any) => {};
  dispatch: Dispatch;
}
interface LoginParameter {
  username: string;
  password: string | number;
}
class Login extends Component<LoginProps, {}> {
  public state = {
    username: '',
    password: '',
    Landing: false
  }
  private changeValue (value: string, key: string) {
    this.setState({
      [key]: value
    })
  }
  public loginFlowFn (data: LoginParameter) {}
  public componentDidMount () {
    this.loginFlowFn = loginFlow(this.props.dispatch) // 初始化loginflow
  }
  private async requestLoginFn () {
    if (this.state.Landing) { return }
    try {
      this.setState({ Landing: true })
      await this.loginFlowFn({
        username: this.state.username,
        password: this.state.password
      })
      this.loginSuceessHandle()
    } catch (error) {
      this.setState({ Landing: false })
      console.error(error)
    }
  }
  public loginSuceessHandle () {
    this.initCommonInfoFn() // 登录后重新初始化基础数据
    let pathname = '/index'
    routerPush({
      pathname
    })
  }
  public async initCommonInfoFn () {
    try {
      let data  = await initCommonInfo(this.props.dispatch)
      console.log(data)
    } catch (error) {
    }
  }
  public render () { 
    let username = this.state.username
    let password = this.state.password
    return <div 
      style={{backgroundImage: 'url(' + LoginBg + ')'}} 
      className={'bg-cover-center ' + styles.container}
    >
      <div className={styles.main}>
        <div className={styles.title}>登录</div>
        <Input 
          className={styles.input} 
          size="large" 
          placeholder='请输入账号' 
          value={username} 
          onChange={ (e) => { this.changeValue(e.target.value, 'username') } }
        ></Input> 
        <Input 
          className={styles.input} 
          size="large" placeholder='请输入密码' 
          type="password"   
          onChange={ (e) => { this.changeValue(e.target.value, 'password') } }
          value={password}
        ></Input> 
        <Button 
          className={styles.btn} 
          size="large" 
          type="primary"
          loading={this.state.Landing}
          onClick={this.requestLoginFn.bind(this)}
        >登录</Button>
      </div>
    </div>
  }
}
const mapStateToProps = null
const mapDispatchToProps = (dispatch: any) => ({
  LoginFlowFn: loginFlow(dispatch)
})

export default connect(mapStateToProps, null)(Login)


