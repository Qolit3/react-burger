import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";
import { TLoginState } from "../reducers/loginReducer";
import { authFail, authSuccess, TUserActions } from "./userAction";

export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export interface ILogin{
  readonly type: typeof LOGIN;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly email: string;
  readonly name: string;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
| ILogin
| ILoginSuccess
| ILoginFailed

const loginFail: ActionCreator<ILoginFailed> = () => {
  return { type: LOGIN_FAILED }
}


export const login: ActionCreator<ThunkAction<void, TLoginState, undefined, TLoginActions>> = (email: string, pass: string) => {
  return function(dispatch: Dispatch<TLoginActions | TUserActions>) {
    dispatch({
      type: LOGIN
    })
    fetch(`${api}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": pass,
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]) 

        dispatch({
          type: LOGIN_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
        dispatch(authSuccess())
      } else {
        dispatch(loginFail())
        dispatch(authFail())
        console.log(res)
      }
    })
    .catch(res => {
      dispatch(loginFail());
      dispatch(authFail());
      console.log(res)
    })
  }
}