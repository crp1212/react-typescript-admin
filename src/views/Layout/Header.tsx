import React, { Component } from 'react'
import styles from './layout.less'
import { Popover } from 'antd'
import { logoutFlow } from '@/store/login/flow'
import { connect } from 'react-redux'
import { push as routerPush } from '@/utils/history-operate'

interface HeaderProps { 
  LogoutFlowFn: () => {};
  userInfo: CommonObject;
}

class Header extends Component<HeaderProps, {}> {
  public state = {
  }
  public async logout () {
    try {
      let data = await this.props.LogoutFlowFn()
      // 注销成功后, 跳转到登录页
      routerPush({
        pathname: '/login'
      })
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
          <div className={styles.userName}>{this.props.userInfo.name}</div>
          <i className="iconfont icon-moreunfold"></i>
        </div>
      </Popover> 
      
    </header>
  }
}
const mapStateToProps = (state: any) => ({
  userInfo: state.Common.userInfo || {}
})
const mapDispatchToProps = (dispatch: any) => ({
  LogoutFlowFn: logoutFlow(dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)


