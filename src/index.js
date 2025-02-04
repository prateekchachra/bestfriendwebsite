import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterComponent from './Router'

import store from './redux/store'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { LocalizeProvider } from "react-localize-redux";







ReactDOM.render(
  <React.StrictMode>
    <LocalizeProvider>
     <Provider store={store}>
    <RouterComponent />
    </Provider>
    </LocalizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
