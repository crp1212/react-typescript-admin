import React, { Component } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Main from './Main'
import styles from './layout.less'
/* interface IndexProps { 
  a: string;
}
 */
class Index extends Component{
  public state = {
  
  }
  public render () {
    return <>
      <Header></Header>
      <section className={styles.section}>
        <SideBar ></SideBar> 
        <Main></Main>
      </section>
    </>
  }
}


export default Index


