import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from "../actions/loginAction"

const initialstate = {
  loginRequest: false,
  loginFailed: false,
  login: {
    name: null,
    email: null
  }
}

export const loginReducer = (state = initialstate, action) => {
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