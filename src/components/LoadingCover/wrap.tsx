import React, { Component } from 'react'
import LoadingCover from './index'
import styles from './index.less'

interface WrapProps { 
  loading: boolean;
  className: string;
}

class Wrap extends Component<WrapProps, {}> {
  public state = {
  }
  public render () {    
    let loading = this.props.loading
    return <div className={styles.wrap + ' ' + this.props.className}>
      {
        loading ? <LoadingCover loading={true}></LoadingCover> : this.props.children  
      }
    </div>
  }
}


export default Wrap


