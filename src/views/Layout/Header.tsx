import React, { Component } from 'react'
import styles from './layout.less'
import { Popover } from 'antd'
import { logoutFlow } from '@/store/login/flow'
import { connect } from 'react-redux'

interface HeaderProps { 
  LogoutFlowFn: () => {};
}

class Header extends Component<HeaderProps, {}> {
  public state = {
  }
  public async logout () {
    try {
      let data = await this.props.LogoutFlowFn()
      console.log(data)
    } catch (error) { 
      console.log(error)
    }
  }
  public render () {    
    return <header className={styles.header}>
      <div className={styles.logo}></div>
      <Popover 
        content={
          <div className={ styles.infoPopover } onClick={ this.logout.bind(this) }>注销</div>
        }
        title="" trigger="hover"
      >
        <div className={styles.info}>
          <div className={styles.avatar}></div>
          <div className={styles.userName}>成吉思汗</div>
          <i className="iconfont icon-moreunfold"></i>
        </div>
      </Popover> 
      
    </header>
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  LogoutFlowFn: logoutFlow(dispatch)
})
export default connect(null, mapDispatchToProps)(Header)


