import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppDispatch, AppThunk } from "../..";
import { api } from "../../util/constants";
import { checkResponse, getCookie } from "../../util/functions";
import { TCreateOrderState } from "../reducers/create-order-reducer";
import { CLEAR_BURGER_INGREDIENTS } from "./burger-ing-actions";


export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const SET_ORDER_MODAL: 'SET_ORDER_MODAL' = 'SET_ORDER_MODAL';
export const REMOVE_ORDER_MODAL: 'REMOVE_ORDER_MODAL' = 'REMOVE_ORDER_MODAL';

export interface IGetOrder {
  readonly type: typeof GET_ORDER;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: any;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface ISetOrderModal {
  readonly type: typeof SET_ORDER_MODAL;
}

export interface IRemoveOrderModal {
  readonly type: typeof REMOVE_ORDER_MODAL;
}

export type TCreateOrderActions = 
  | IGetOrder
  | IGetOrderFailed
  | IGetOrderSuccess
  | ISetOrderModal
  | IRemoveOrderModal

export const getOrderFail: ActionCreator<IGetOrderFailed> = () =>  {
  return { type: GET_ORDER_FAILED }
}

export const getOrder: AppThunk = (ingredientsId: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER
    })
    fetch(`${api}/orders`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${getCookie('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': ingredientsId
      })
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res
        })
        dispatch({
          type: CLEAR_BURGER_INGREDIENTS
        })
      } else {
        dispatch(getOrderFail())
      }
    })
    .catch(res => {
      dispatch(getOrderFail())
      console.log(res)
    })
  }
}