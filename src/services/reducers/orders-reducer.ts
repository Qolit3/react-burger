import { TOrderInFeed } from "../../types-and-interfacese/types";
import {
  ORDERS_CLOSE,
  ORDERS_CONNECTING,
  ORDERS_ERROR,
  ORDERS_MESSAGE,
  ORDERS_OPEN,
  TOrdersActions
} from "../actions/orders-actions"

export type TOrdersState = {
  status: 'offline' | 'connecting' | 'online';
  connectionError: string;
  data: {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TOrderInFeed[];
  }
}

const initialState: TOrdersState = {
  status: 'offline',
  connectionError: '',
  data: {
    success: false,
    total: NaN,
    totalToday: NaN,
    orders: []
  }
}

export const ordersReducer = (state = initialState, action: TOrdersActions): TOrdersState => {
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