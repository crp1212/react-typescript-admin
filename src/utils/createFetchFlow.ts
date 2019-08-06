export default function (name: string, requestFn: (parameter: any) => {}) {
  return function (dispatch: any) { // 任意参数
    return async function (parameter: any) {
      let success = null
      let init = dispatch({
        type: `REQUEST_${name}`
      })
      try {
        success = await requestFn(parameter)
        dispatch({
          type: `REQUEST_${name}_SUCCESS`,
          value: success
        })
        return {
          init,
          success
        }
      } catch (error) {
        dispatch({
          type: `REQUEST_${name}_FAIL`,
          value: error
        })
        return Promise.reject(error)
      }
    }
  }
}