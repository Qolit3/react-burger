import {
  REGISTRATION,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  TRegistrationActions
} from "../actions/registrationAction"

export type TRegistrationState = {
  registrationRequest: boolean;
  registrationFailed: boolean;
  registartion: {
    name: undefined | string;
    email: undefined | string;
  } 
}

const initialstate: TRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  registartion: {
    name: undefined,
    email: undefined
  }
}

export const registrationReducer = (state = initialstate, action: TRegistrationActions): TRegistrationState => {
  
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