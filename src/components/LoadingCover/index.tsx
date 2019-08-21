import React, {useEffect, useRef} from 'react'
import { Spin } from 'antd'
import styles from './index.less'
import { hexColorToRGB } from '@/utils/index'
function getBackgroundColor (bgColor = '', opacity = 1) {
  bgColor = bgColor.replace('#', '')
  let rgbs: number[] = hexColorToRGB(bgColor || 'ffffff')
  return `rgba(${rgbs.join(',')},${opacity})`
}
function LoadingCover({ loading = false, opacity = 0.6, bgColor = ''}) {
  let el = useRef(null)
  useEffect(() => {
    let current: any = el.current
    let parentNode = current && current.parentNode
    if (parentNode && !parentNode.style.position) {
      parentNode.style.position = 'relative'
    }
  }, [])
  let backgroundColor = getBackgroundColor(bgColor, opacity)
  let display = `${loading ? 'flex' : 'none'}`
  return <div className={styles.container} style={{ backgroundColor, display}} ref={el} >
    <Spin></Spin>
  </div>
}
export default LoadingCover


