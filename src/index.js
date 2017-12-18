import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(middleware)


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
