import { api } from "../../util/constants";

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER
    })
    fetch(`${api}/orders`, {
      method: 'POST',
      headers: {
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