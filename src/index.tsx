import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './CRA/reportWebVitals';
import { applyMiddleware, createStore, compose, ActionCreator } from 'redux';
import { rootReducer } from './services/reducers/root-reducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { FEED_CLOSE, FEED_CONNECT, FEED_CONNECTING, FEED_DISCONNECT, FEED_ERROR, FEED_MESSAGE, FEED_OPEN } from './services/actions/feed-actions';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { ORDERS_CLOSE, ORDERS_CONNECT, ORDERS_CONNECTING, ORDERS_DISCONNECT, ORDERS_ERROR, ORDERS_MESSAGE, ORDERS_OPEN } from './services/actions/orders-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TApplicationActions } from './types-and-interfacese/types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const feedActions = {
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_CONNECTING,
  wsOpen: FEED_OPEN,
  wsClose: FEED_CLOSE,
  wsMessage: FEED_MESSAGE,
  wsError: FEED_ERROR
}

const feedMiddleware = socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedActions)

const ordersActions = {
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_CONNECTING,
  wsOpen: ORDERS_OPEN,
  wsClose: ORDERS_CLOSE,
  wsMessage: ORDERS_MESSAGE,
  wsError: ORDERS_ERROR
}

const ordersMiddleware = socketMiddleware(`wss://norma.nomoreparties.space/orders`, ordersActions)


const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(ordersMiddleware),
    applyMiddleware(feedMiddleware),
    applyMiddleware(thunk)
  )
);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, TRootState, undefined, TApplicationActions >>
export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector


export type TRootState = ReturnType<typeof store.getState>

root.render(
  <React.StrictMode>
    <Router>
    <Provider store={store} >
      <App />
    </Provider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
