import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TLoginActions
} from "../actions/login-action"

export type TLoginState = {
  loginRequest: boolean;
  loginFailed: boolean;
  login: {
    name: string | undefined;
    email: string | undefined;
  }
}

const initialstate: TLoginState = {
  loginRequest: false,
  loginFailed: false,
  login: {
    name: undefined,
    email: undefined
  }
}

export const loginReducer = (state = initialstate, action: TLoginActions): TLoginState => {
  switch(action.type) {
    case LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest:false,
        login: {
          ...state,
          name: action.name,
          email: action.email,
        }
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      }
    }
    default:
      return state
  }
}