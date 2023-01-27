import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";
import { TLoginUpdateState } from "../reducers/loginUpdateReducer";
import { authFail, authSuccess, TUserActions } from "./userAction";

export const LOGIN_UPDATE: 'LOGIN_UPDATE' = 'LOGIN_UPDATE';
export const LOGIN_UPDATE_SUCCESS: 'LOGIN_UPDATE_SUCCESS' = 'LOGIN_UPDATE_SUCCESS';
export const LOGIN_UPDATE_FAILED: 'LOGIN_UPDATE_FAILED' = 'LOGIN_UPDATE_FAILED';

export interface ILoginUpdate {
  readonly type: typeof LOGIN_UPDATE;
}

export interface ILoginUpdateSuccess {
  readonly type: typeof LOGIN_UPDATE_SUCCESS;
}

export interface ILoginUpdateFailed {
  readonly type: typeof LOGIN_UPDATE_FAILED;
}

export type TUpdateLoginActions = 
| ILoginUpdate
| ILoginUpdateSuccess
| ILoginUpdateFailed


export const loginUpdateFail: ActionCreator<ILoginUpdateFailed> = () => {
  return { type: LOGIN_UPDATE_FAILED }
}


export const loginUpdate: ActionCreator<ThunkAction<void, TLoginUpdateState, undefined, TUpdateLoginActions>> = (token: string) =>  {
  return function(dispatch: Dispatch<TUpdateLoginActions | TUserActions>) {
    dispatch({
      type: LOGIN_UPDATE
    })
    return fetch(`${api}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": token
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1])
        
        dispatch({
          type: LOGIN_UPDATE_SUCCESS
        })
        dispatch(authSuccess())
        
      } else {
        dispatch(loginUpdateFail());
        dispatch(authFail());        
        console.log(res)
      }
    })
    .catch(res => {
      dispatch(loginUpdateFail());
      dispatch(authFail());
      console.log(res)
    })
  }
}