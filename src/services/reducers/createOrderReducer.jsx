import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS, 
  REMOVE_ORDER_MODAL, 
  SET_ORDER_MODAL} from "../actions/createOrderAction"

const initialstate = { 
  orderRequest: false,
  orderFailed: false,
  order: {},
  orderModal: false
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
    case SET_ORDER_MODAL: {
      return {
        ...state,
        orderModal: true
      }
    }
    case REMOVE_ORDER_MODAL: {
      return {
        ...state,
        orderModal: false
      }
    }
    default:
      return state
  }
}