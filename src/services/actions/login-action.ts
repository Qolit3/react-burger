import { ActionCreator } from "redux";
import { AppDispatch, AppThunk } from "../..";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";
import { authFail, authSuccess } from "./user-action";

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


export const login: AppThunk = (email: string, pass: string) => {
  return function(dispatch: AppDispatch) {
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