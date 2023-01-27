import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS, 
  REMOVE_ORDER_MODAL, 
  SET_ORDER_MODAL,
  TCreateOrderActions
} from "../actions/createOrderAction"

export type TCreateOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: {
    name: string;
    order: {
      number: number
    };
    success: boolean;
  };
  orderModal: boolean;
}

const initialstate: TCreateOrderState = { 
  orderRequest: false,
  orderFailed: false,
  order: {
    name: '',
    order: {
      number: NaN
    },
    success: false
  },
  orderModal: false
}

export const orderReducer = (state = initialstate, action: TCreateOrderActions): TCreateOrderState => {
  switch(action.type) {
    case GET_ORDER: {
      return {
        ...state,
        order: {
          success: false,
          name: '',
          order: {
            number: NaN
          }
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