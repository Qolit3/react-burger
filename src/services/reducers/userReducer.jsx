import { FAILED_AUTHORIZATION, SUCCESSFUL_AUTHORIZATION } from "../actions/userAction"


const initialstate = {
  isAuthorized: false
} 

export const userReducer = (state = initialstate, action) => {
  switch(action.type) {
    case SUCCESSFUL_AUTHORIZATION: {
      return {
        ...state,
        isAuthorized: true
      }
    }
    case FAILED_AUTHORIZATION: {
      return {
        ...state,
        isAuthorized: false
      }
    }
    default:
      return state
  }
}