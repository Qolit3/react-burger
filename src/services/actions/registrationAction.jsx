import { authFail, authSuccess, registerFail } from "./actionCreators";
import { api } from "../../util/constants";
import { checkResponse, setCookie } from "../../util/functions";

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