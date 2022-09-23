import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './CRA/reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './services/reducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);


const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
