import { TOrderInFeed } from "../../types_and_interfacese/types";
import {
  FEED_CLOSE,
  FEED_CONNECTING,
  FEED_ERROR,
  FEED_MESSAGE,
  FEED_OPEN,
  TFeedActions
} from "../actions/feedActions"

export type TFeedState = {
  status: 'offline' | 'connecting' | 'online';
  connectionError: string;
  data: {} | {
    success: boolean;
    total: number;
    totalToday: number;
    orders: TOrderInFeed[];
  }
}

const initialState: TFeedState = {
  status: 'offline',
  connectionError: '',
  data: {}
}

export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
  switch(action.type) {
    case FEED_CONNECTING: {
      return {
        ...state,
        status: 'connecting'
      }
    }
    case FEED_OPEN: {
      return {
        ...state,
        status: 'online',
        connectionError: ''
      }
    }
    case FEED_CLOSE: {
      return {
        ...state,
        status: 'offline',
        connectionError: ''
      }
    }
    case FEED_ERROR: {
      return {
        ...state,
        connectionError: action.error
      }
    }
    case FEED_MESSAGE: {
      return {
        ...state,
        data: action.data
      }
    }
    default:
      return state
  }
}