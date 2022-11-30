import { api } from "../../util/constants";
import { setCookie } from "../../util/functions";
import { FAILED_AUTHORIZATION, SUCCESSFUL_AUTHORIZATION } from "./userAction";

export const LOGIN_UPDATE = 'LOGIN_UPDATE';
export const LOGIN_UPDATE_SUCCESS = 'LOGIN_UPDATE_SUCCESS';
export const LOGIN_UPDATE_FAILED = 'LOGIN_UPDATE_FAILED';

export function loginUpdate(token) {
  return function(dispatch) {
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
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1])
        
        dispatch({
          type: LOGIN_UPDATE_SUCCESS
        })
        dispatch({
          type: SUCCESSFUL_AUTHORIZATION
        })
        
      } else {
        console.log('error')
        dispatch({
          type: LOGIN_UPDATE_FAILED
        })
        dispatch({
          type: FAILED_AUTHORIZATION
        })
        
        console.log(res)
      }
    })
    .catch(res => {
      dispatch({
        type: LOGIN_UPDATE_FAILED
      })
      console.log(res)
    })
  }
}