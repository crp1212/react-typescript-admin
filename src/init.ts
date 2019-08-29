import { InituserInfoFlow } from '@/store/common/flow'
import { Dispatch } from 'redux'

export async function initUserInfo (dispatch: Dispatch) {
  try {
    let data = await InituserInfoFlow(dispatch)()
    console.log('initUserInfo', data)
  } catch (error) {
    console.log(error)
  }
}
export async function initCommonInfo (dispatch: Dispatch) {
  let promiseList = [ initUserInfo(dispatch) ]
  try {
    await Promise.all(promiseList)
  } catch (error) {
    
  }
}