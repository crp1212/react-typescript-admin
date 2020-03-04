import React, { Component } from 'react'
import { initCopyElement } from '@/utils/copy'
import { successNotify, errorNotify } from '@/utils/index'

interface CopyWarpProps { 
  
}

class CopyWarp extends Component<CopyWarpProps, {}> {
  public state = {
  }
  public copyRef: HTMLDivElement | null = null
  public componentDidMount () {
    initCopyElement(this.copyRef, () => {
      successNotify('复制成功')
    }, () => {
      errorNotify('复制失败')
    })
  }
  public render () {    
    return <div ref={ref => (this.copyRef = ref)} style={{cursor: 'pointer'}}>{ this.props.children }</div>
  }
}


export default CopyWarp


