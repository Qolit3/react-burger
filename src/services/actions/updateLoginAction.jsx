import { authFail, authSuccess, loginUpdateFail } from "../../util/actionCreators";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";

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