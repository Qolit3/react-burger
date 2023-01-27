import {
  FAILED_AUTHORIZATION,
  SUCCESSFUL_AUTHORIZATION,
  TUserActions
} from "../actions/userAction"

export type TUserState = {
  isAuthorized: boolean;
}

const initialstate = {
  isAuthorized: false
} 

export const userReducer = (state = initialstate, action: TUserActions) => {
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