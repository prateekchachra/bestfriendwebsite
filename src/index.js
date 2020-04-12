import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Quiz from './listpages/Quiz';
import store from './redux/store'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Header from './components/main/Header';

const RouterComponent = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:language/quiz" component={Quiz} />
    </Switch>
  </Router>
)


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <RouterComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
