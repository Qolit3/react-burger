import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './CRA/reportWebVitals';
import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './services/reducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 


const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const enhancers = compose(applyMiddleware(thunk), composeEnhancers())


const store = createStore(rootReducer, enhancers);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
