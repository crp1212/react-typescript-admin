import { InituserInfoFlow } from '@/store/common/flow'
import { Dispatch } from 'redux'
import { requestQiniuToken } from '@/apis/common'
import { setSessionStorage } from '@/utils/storage'

export async function initUserInfo (dispatch: Dispatch) {
  try {
    let data = await InituserInfoFlow(dispatch)()
    console.log('initUserInfo', data)
  } catch (error) {
    console.log(error)
  }
}
export async function initQiniuConfig () {
  try {
    let data: CommonObject = await requestQiniuToken()
    setSessionStorage('QiniuConfig', data)
  } catch (error) {
    
  }
}
export async function initCommonInfo (dispatch: Dispatch) {
  let promiseList = [ initUserInfo(dispatch), initQiniuConfig() ]
  try {
    await Promise.all(promiseList)
  } catch (error) {
    
  }
}