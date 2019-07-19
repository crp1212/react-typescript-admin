import React, { Component } from 'react'
import LoginBg from '@/assets/image/33-hd.jpg'
import styles from './Login.less'
import { Input, Button } from 'antd'

interface LoginProps { 
  
}

class Login extends Component<LoginProps, {}> {
  public state = {
    username: '',
    password: ''
  }
  changeValue (value: string, key: string) {
    this.setState({
      [key]: value
    })
  }
  Login () {
    console.log(this.state)
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
            onClick={this.Login.bind(this)}
          >登录</Button>
        </div>
      </div>
  }
}


export default Login


