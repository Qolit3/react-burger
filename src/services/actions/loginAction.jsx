import { api } from "../../util/constants";
import { setCookie } from "../../util/functions";
import { FAILED_AUTHORIZATION, SUCCESSFUL_AUTHORIZATION } from "./userAction";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function login(email, pass) {
  return function(dispatch) {
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
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1])
        

        dispatch({
          type: LOGIN_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
        dispatch({
          type: SUCCESSFUL_AUTHORIZATION
        })
      } else {
        dispatch({
          type: LOGIN_FAILED
        })
        dispatch({
          type: FAILED_AUTHORIZATION
        })
        console.log(res)
      }
    })
    .catch(res => {
      dispatch({
        type: LOGIN_FAILED
      })
      console.log(res)
    })
  }
}