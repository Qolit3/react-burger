import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";
import { TRegistrationState } from "../reducers/registrationReducer";
import { TOrdersActions } from "./ordersActions";
import { authFail, authSuccess, TUserActions } from "./userAction";

export const REGISTRATION: 'REGISTRATION' = 'REGISTRATION';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';

export interface IRegistration {
  readonly type: typeof REGISTRATION;
}

export interface IRegistrationSucess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly email: string;
  readonly name: string;
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export type TRegistrationActions = 
| IRegistration
| IRegistrationFailed
| IRegistrationSucess

export const registerFail: ActionCreator<IRegistrationFailed> = () => {
  return { type: REGISTRATION_FAILED }
}

export const registration: ActionCreator<ThunkAction<void, TRegistrationState, undefined, TRegistrationActions>> = (name: string, email: string, pass: string) => {
  return function(dispatch: Dispatch<TRegistrationActions | TUserActions>) {
    dispatch({
      type: REGISTRATION
    })
    fetch(`${api}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": pass,
        "name": name
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1])
        
        dispatch({
          type: REGISTRATION_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
        dispatch(authSuccess())
        console.log(1)
      } else {
        dispatch(registerFail())
        dispatch(authFail())
        console.log(res)
      }
    })
    .catch(res => {
      dispatch(registerFail());
      dispatch(authFail());
      console.log(res)
    })
  }
}