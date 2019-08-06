import React, { Component } from 'react'
import LoginBg from '@/assets/image/33-hd.jpg'
import styles from './Login.less'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { LoginAction } from '@/store/login/action' 

interface LoginProps { 
  LoginAction: (option: any) => {}
}

class Login extends Component<LoginProps, {}> {
  public state = {
    username: '',
    password: '',
    Landing: false
  }
  changeValue (value: string, key: string) {
    this.setState({
      [key]: value
    })
  }
  async requestLoginFn () {
    if (this.state.Landing) { return }
    try {
      this.setState({ Landing: true })
      let data = await this.props.LoginAction({
        username: this.state.username,
        password: this.state.password
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
    this.setState({ Landing: false })
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
const mapDispatchToProps = {
  LoginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


