import { ORDERS_CLOSE, ORDERS_CONNECTING, ORDERS_ERROR, ORDERS_MESSAGE, ORDERS_OPEN } from "../actions/ordersActions"


const initialState = {
  status: 'offline',
  connectionError: '',
  data: {}
}

export const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case ORDERS_CONNECTING: {
      return {
        ...state,
        status: 'connecting'
      }
    }
    case ORDERS_OPEN: {
      return {
        ...state,
        status: 'online',
        connectionError: ''
      }
    }
    case ORDERS_CLOSE: {
      return {
        ...state,
        status: 'offline',
        connectionError: ''
      }
    }
    case ORDERS_ERROR: {
      return {
        ...state,
        connectionError: action.error
      }
    }
    case ORDERS_MESSAGE: {
      return {
        ...state,
        data: action.data
      }
    }
    default:
      return state
  }
}