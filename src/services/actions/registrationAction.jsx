import { api } from "../../util/constants";
import { setCookie } from "../../util/functions";
import { FAILED_AUTHORIZATION, SUCCESSFUL_AUTHORIZATION } from "./userAction";

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export function registration(name, email, pass) {
  return function(dispatch) {
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
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1])
        

        dispatch({
          type: REGISTRATION_SUCCESS,
          email: res.user.email,
          name: res.user.name
        })
        dispatch({
          type: SUCCESSFUL_AUTHORIZATION
        })
        console.log(1)
      } else {
        dispatch({
          type: REGISTRATION_FAILED
        })
        dispatch({
          type: FAILED_AUTHORIZATION
        })
        console.log(res)
      }
    })
    .catch(res => {
      dispatch({
        type: REGISTRATION_FAILED
      })
      console.log(res)
    })
  }
}