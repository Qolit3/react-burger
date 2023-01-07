import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './CRA/reportWebVitals';
import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './services/reducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { FEED_CLOSE, FEED_CONNECT, FEED_CONNECTING, FEED_DISCONNECT, FEED_ERROR, FEED_MESSAGE, FEED_OPEN } from './services/actions/feedActions';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { ORDERS_CLOSE, ORDERS_CONNECT, ORDERS_CONNECTING, ORDERS_DISCONNECT, ORDERS_ERROR, ORDERS_MESSAGE, ORDERS_OPEN } from './services/actions/ordersActions';
import { getCookie } from './util/functions';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const root = ReactDOM.createRoot(
  document.getElementById('root')
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

const ordersMiddleware = socketMiddleware(`wss://norma.nomoreparties.space/orders?token=${getCookie('accessToken')}`, ordersActions)

const enhancers = compose(applyMiddleware(ordersMiddleware), applyMiddleware(feedMiddleware), applyMiddleware(thunk), composeEnhancers())


const store = createStore(rootReducer, enhancers);

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
