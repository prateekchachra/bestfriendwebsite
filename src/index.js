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
import Footer from './components/main/Footer';
import FrequentlyAsked from './components/common/FrequentlyAsked';
import AboutUs from './components/common/AboutUs';
import PrivacyPolicy from './components/common/PrivacyPolicy';
import Contact from './components/common/Contact';
import ScoringQuiz from './listpages/ScoringQuiz';
import QuizResult from './listpages/QuizResult';

const RouterComponent = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:language/quiz" component={Quiz} />
      <Route path="/contact-us" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/faq" component={FrequentlyAsked} />
      <Route path="/quiz/:quizId" component={ScoringQuiz} />
      <Route path="/quiz-result/:name/:quizId" component={QuizResult} />
    </Switch>
    <Footer />
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
