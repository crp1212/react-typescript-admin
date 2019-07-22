import { message } from 'antd'
export const errorNotify = (str: string) => { // 消息错误提醒
  message.error(str)
}