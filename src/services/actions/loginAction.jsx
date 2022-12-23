import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";
import { authFail, authSuccess, loginFail } from "./actionCreators";

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