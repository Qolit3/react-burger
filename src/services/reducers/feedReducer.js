import { FEED_CLOSE, FEED_CONNECTING, FEED_ERROR, FEED_MESSAGE, FEED_OPEN } from "../actions/feedActions"


const initialState = {
  status: 'offline',
  connectionError: '',
  data: {}
}

export const feedReducer = (state = initialState, action) => {
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