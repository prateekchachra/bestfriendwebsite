//import liraries
import React, { Component } from 'react';


import { renderToStaticMarkup } from "react-dom/server";
import App from './App';
import Quiz from './listpages/Quiz';
import ReactGA from "react-ga";
import icon from './assets/img/heart.js'
import ParticlesBg from "particles-bg";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import FrequentlyAsked from './components/common/FrequentlyAsked';
import AboutUs from './components/common/AboutUs';
import Blog from './components/common/Blog';
import PrivacyPolicy from './components/common/PrivacyPolicy';
import Contact from './components/common/Contact';
import ScoringQuiz from './listpages/ScoringQuiz';
import QuizResult from './listpages/QuizResult';



import globalTranslations from './assets/translations/globalTranslations.json'


import { withLocalize, Translate } from "react-localize-redux";
// create a component
class RouterComponent extends React.Component {
    constructor(props){
      super(props)


      const languages = [
        { name: "English", code: "en" },
        // { name: "Español", code: "es" },
      ];
      const defaultLanguage = localStorage.getItem("languageCode") || languages[0].code;


      this.props.initialize({
        languages,
        translation: globalTranslations,
        options: { renderToStaticMarkup, defaultLanguage}
      });
  
    }

    componentDidMount() {
      ReactGA.initialize('UA-168682284-1');
   }
  
    render()
  
  {
    let config = {
      num: [2, 3],
      rps: 0.2,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-50, 50],
      alpha: [0.6, 0],
      scale: [.1, 0.9],
      body: icon,
      position: "all",
      cross: "dead",
      random: 10
    };
    return(
    <Router>
      <Header />
      <ParticlesBg type="custom" config={config} bg={true} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:language/quiz" component={Quiz} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/faq" component={FrequentlyAsked} />
        <Route path="/blog" component={Blog} />
        <Route path="/quiz/:quizId" component={ScoringQuiz} />
        <Route path="/quiz-result/:name/:quizId" component={QuizResult} />
        <Route path="*" component={App} >
          </Route>
      </Switch>
      <Footer />
    </Router>
  )}
  
  }

//make this component available to the app
export default withLocalize(RouterComponent);
