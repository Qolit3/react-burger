import { REGISTRATION, REGISTRATION_FAILED, REGISTRATION_SUCCESS } from "../actions/registrationAction"


const initialstate = {
  registrationRequest: false,
  registrationFailed: false,
  registartion: {
    name: null,
    email: null
  }
}

export const registrationReducer = (state = initialstate, action) => {
  
  switch(action.type) {
    case REGISTRATION: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest:false,
        registartion: {
          ...state,
          name: action.name,
          email: action.email,
        }
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true
      }
    }
    default:
      return state
  }
}