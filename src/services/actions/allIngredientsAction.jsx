import { api } from "../../util/constants";
import { checkResponse } from "../../util/functions";
import { getAllIngFail } from "./actionCreators";

export const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED';

export function getAllIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_ALL_INGREDIENTS
    })
    fetch(`${api}/ingredients`)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          allIngredients: res.data
        })
      } else {
        dispatch(getAllIngFail())
      }
    })
    .catch(res => {
      dispatch(getAllIngFail())
      console.log(res)
    })
  }
}