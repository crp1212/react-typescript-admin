import { message } from 'antd'
export const errorNotify = (str: string) => { // 消息错误提醒
  message.error(str)
}
export function hexColorToRGB (hexColor = '') { // 
  if (hexColor.length !== 6) { 
    console.error('非正确的十六进制颜色') 
    return []
  }
  let tem = []
  let i = 0
  while (i < 6) {
    tem.push(hexColor.slice(i, i += 2))
  }
  return tem.map((val: string) => parseInt(val, 16))
}