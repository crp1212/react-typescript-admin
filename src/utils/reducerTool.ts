export function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
      if (handlers.hasOwnProperty(action.type)) {
          return handlers[action.type](state, action)
      } else {
          return state
      }
  }
}

export function combineReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
      if (handlers.hasOwnProperty(action.type)) {
          return handlers[action.type](state, action)
      } else {
          return state
      }
  }
}

export const createAction = (type: string) => (val = {}) => { // 默认的val是对象的结构
  let action = {
      type,
      ...val
  }
  return action
}