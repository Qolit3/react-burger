import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS } from "../actions/createOrderAction"

const initialstate = { 
  orderRequest: false,
  orderFailed: false,
  order: {}
}

export const order = (state = initialstate, action) => {
  switch(action.type) {
    case GET_ORDER: {
      return {
        order: {
          ...state,
          success: false
        },
        orderRequest: true,
        orderFailed: false
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.order
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true 
      }
    }
    default:
      return state
  }
}