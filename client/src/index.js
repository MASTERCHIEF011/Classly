import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import 'simplebar/src/simplebar.css';

import reducers from './reducers';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// ----------------------------------------------------------------------

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
