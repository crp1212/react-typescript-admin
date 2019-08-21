import React, { Component } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Main from './Main'
import styles from './layout.less'
import { sideBarsRoutes } from '@/router/index'
interface IndexProps { 
  
}

class Index extends Component<IndexProps, {}> {
  public state = {
  }
  public render () {
    return <>
      <Header></Header>
      <section className={styles.section}>
        <SideBar routes={sideBarsRoutes}></SideBar> 
        <Main></Main>
      </section>
    </>
  }
}


export default Index


