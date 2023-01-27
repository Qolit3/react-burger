import {
  LOGIN_UPDATE,
  LOGIN_UPDATE_FAILED,
  LOGIN_UPDATE_SUCCESS,
  TUpdateLoginActions
} from "../actions/updateLoginAction"

export type TLoginUpdateState = {
  loginUpdateRequest: boolean;
  loginUpdateFailed: boolean;
}

const initialstate: TLoginUpdateState = {
  loginUpdateRequest: false,
  loginUpdateFailed: false,
}

export const loginUpdateReducer = (state = initialstate, action: TUpdateLoginActions): TLoginUpdateState => {
  
  switch(action.type) {
    case LOGIN_UPDATE: {
      return {
        ...state,
        loginUpdateRequest: true,
        loginUpdateFailed: false
      }
    }
    case LOGIN_UPDATE_SUCCESS: {
      return {
        ...state,
        loginUpdateRequest:false
      }
    }
    case LOGIN_UPDATE_FAILED: {
      return {
        ...state,
        loginUpdateRequest: false,
        loginUpdateFailed: true
      }
    }
    default:
      return state
  }
}