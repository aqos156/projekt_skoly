export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

const defaultState: any = {
  user: null
}

function common(state: any = defaultState, action: any) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default common
