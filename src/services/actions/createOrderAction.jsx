import { accessToken, api } from "../../util/constants";
import { getCookie } from "../../util/functions";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_ORDER_MODAL = 'SET_ORDER_MODAL';
export const REMOVE_ORDER_MODAL = 'REMOVE_ORDER_MODAL';

export function getOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    })
    fetch(`${api}/orders`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': ingredientsId
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
    .catch(res => {
      dispatch({
        type: GET_ORDER_FAILED
      })
      console.log(res)
    })
  }
}