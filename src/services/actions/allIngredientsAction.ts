import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TIngredient } from "../../types_and_interfacese/types";
import { api } from "../../util/constants";
import { checkResponse } from "../../util/functions";
import { TAllIngredientState } from "../reducers/allIngredientsReducer";

export const GET_ALL_INGREDIENTS: 'GET_ALL_INGREDIENTS' = 'GET_ALL_INGREDIENTS';
export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_FAILED: 'GET_ALL_INGREDIENTS_FAILED' = 'GET_ALL_INGREDIENTS_FAILED';

export interface IGetAllIngredients {
  readonly type: typeof GET_ALL_INGREDIENTS;
}

export interface IGetAllIngredientsSuccess {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
  readonly allIngredients: TIngredient[]; 
}

export interface IGetAllIngredientsFailed {
  readonly type: typeof GET_ALL_INGREDIENTS_FAILED;
}


export type TAllIngredientsActions =
  | IGetAllIngredients
  | IGetAllIngredientsSuccess
  | IGetAllIngredientsFailed

export const getAllIngFail: ActionCreator<IGetAllIngredientsFailed> = () => {
  return { type: GET_ALL_INGREDIENTS_FAILED }
}

export const getAllIngredients: ActionCreator<ThunkAction<void, TAllIngredientState, undefined, TAllIngredientsActions>> = () => {
  return function (dispatch: Dispatch<TAllIngredientsActions>) {
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