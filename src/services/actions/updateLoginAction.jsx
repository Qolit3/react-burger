
import { api } from "../../util/constants";
import { checkResponse, getCookie, setCookie } from "../../util/functions";
import { authFail, authSuccess, loginUpdateFail } from "./actionCreators";

export const LOGIN_UPDATE = 'LOGIN_UPDATE';
export const LOGIN_UPDATE_SUCCESS = 'LOGIN_UPDATE_SUCCESS';
export const LOGIN_UPDATE_FAILED = 'LOGIN_UPDATE_FAILED';

export function loginUpdate(token) {
  return function(dispatch) {
    //console.log(getCookie('refreshToken'));
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
   //     console.log(getCookie('refreshToken'));
        setCookie('refreshToken', res.refreshToken);
    //    console.log(getCookie('refreshToken'));
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