import React, { Component } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Main from './Main'
import styles from './layout.less'
import LoadingCover from '@/components/LoadingCover'
import { getRouterAuth } from '@/apis/common'
import { setAuthRoutes } from '@/router/index'
/* interface IndexProps { 
  a: string;
}
 */
class Index extends Component{
  public state = {
    pageLoading: true
  }
  public componentDidMount () {
    this.initRouterAuth()
  }
  public async initRouterAuth () { // 根据权限初始化路由
    try {
      let data = await getRouterAuth()
      console.log(data)
      setAuthRoutes({
        '/index': true,
        '/test': true,
        '/test/v': true,
        '/system': true,
        '/system/manager-list': true
      })
      this.setState({ pageLoading: false })
    } catch (error) {
      
    }
  }
  public render () {
    let pageLoading = this.state.pageLoading
    return <>
      <Header></Header>
      <section className={styles.section}>
        <LoadingCover loading={ this.state.pageLoading }></LoadingCover>    
        <SideBar ></SideBar>
        { pageLoading ? '' : <Main></Main> } 
        
      </section>
    </>
  }
}


export default Index


