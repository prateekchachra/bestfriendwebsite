import React from 'react';
import {connect} from 'react-redux'
import Box from './components/main/Box';
import {saveName, changeLanguage} from './listpages/actions'
import { withLocalize, Translate } from "react-localize-redux";
import Circles from './components/main/Circles';
import ReactGA from 'react-ga';
import {colors} from './assets/styles/theme'
// will be automatically minified ny webpack
import 'bootstrap/dist/css/bootstrap.css'
 class App extends React.Component {

  constructor(props) {
    super(props);

    ReactGA.pageview(window.location.pathname + window.location.search);
    let quizKey = localStorage.getItem("quizKey");
    let name = localStorage.getItem("quizName");
   
      if(name && quizKey && name !== '' && quizKey !== ''){
        //Add localization later
        this.props.history.push('/en/quiz')
      }
    
    this.state = {language:'en', name: '', errors: {} };
  }
  


  onChange = (event) => {
    const{value} = event.target
    this.props.changeLanguage(value)
    this.props.setActiveLanguage(value)
    localStorage.setItem("languageCode", value);
    this.setState({language: value})
  }
  render(){
    const {language, name, errors} = this.state;
  return (
    <div className="App container-fluid">
      <div className='row'>
     <div className="col-1 col-sm-2 col-lg-2"></div>
     <Box classes='col-10 col-sm-8 col-lg-8 box_container'
      style={{paddingBottom: 20, paddingLeft: 20, paddingRight: 20}}>
    
    <div className='text-center'>
     <img 
             className='img-fluid'
            src={require('./assets/img/header-img.png')} 
              style={{width: 380, }}/>
            <img 
             className='img-fluid'
            src={require('./assets/img/info-img.png')} 
              style={{width: '100%', marginBottom: 12}}/>
  </div>
       {/* <p className='text-center font-weight-bold'
       style={{
         fontSize: 24
       }}>
        <Translate id="main.title" />
       </p> */}

      <form onSubmit={(event) => {
         event.preventDefault();
        if(name === ''){
          errors['name'] = 'Name cannot be empty!'
          this.setState({errors})
        }
        else {

        this.props.saveName(name)
        this.props.history.push(`/${language}/quiz`)
        }
      }}>
      <div className="form-group">
          <label htmlFor="nameInput" className='font-weight-bold'  style={{
         fontSize: 20
       }}>    <Translate id="main.languageSelect" /></label>
          <select className="browser-default custom-select" onChange={this.onChange} value={language}>
          <option value='en'>English</option>
         {/* <option value='es'>Español</option>
             <option value='de'>Deutsch</option>
        <option value='fr'>Français</option>
          <option value='id'>Bahasa Indonesia</option>
          <option value='it'>Italiano</option>
          <option value='pt'>Português</option>
          <option value='ru'>Русский</option>
          <option value='tr'>Türkçe</option>
          <option value='ar'>عربى</option>
          <option value='fi'>Suomen Kieli</option>
          <option value='ro'>Română</option>
          <option value='nl'>Nederlands (Dutch)</option>
          <option value='pl'>Polski</option>
          <option value='sv'>Svenska</option>
          <option value='hi'>हिंदी</option>
          <option value='uk'>Украiнська</option>
          <option value='hr'>hrvatski</option>
          <option value='il'>עברית</option>
          <option value='ms'>Bahasa Melayu</option>
          <option value='jp'>日本語</option>
          <option value='ko'>한국어</option>
          <option value='vn'>Tiếng Việt</option>
          <option value='th'>ไทย</option> */}
            </select>
        </div>
      <div className="form-group">
          <label className='font-weight-bold' htmlFor="nameInput" style={{
            fontSize: 20
          }}>  <Translate id="main.nameSelect" /></label>


        <Translate>
        {({ translate }) =>   <input type="name" className="form-control" id="nameInput"
          onChange={(event) => this.setState({name: event.target.value, errors: {}})}
          value={name}
          aria-describedby="emailHelp" placeholder={translate('main.placeholder')} />
        }
          </Translate>
       </div>
       {errors['name'] && <p style={{
         color: 'red',
         fontSize: 18
       }}><Translate id="main.nameWarning" /></p>}
       <button type="submit" value="Submit" className="btn btn-block" style={{
         backgroundColor: colors.ThemeColor,
         color: 'white'
       }}><span>{'\u{1F449}'}</span><Translate id="main.createQuiz" /></button>
  
      </form>
     </Box>

       <div className='row'>
     <div className='col-2 col-sm-3 col-lg-4'></div>
               

       <div className='text-center col-8 col-sm-8 col-lg-6'>
  
<p style={{marginTop: 24}}>Select your Country, Enter your Name, Email, Create your Quiz and Share it with your friends on Facebook or Whatsapp. Once your friends attempt the quiz you will see the results on leaderboard. </p>
<p>Movie Mantra Is a fun quiz site which lets you know who is your true friend and who knows the most about you. You can create your own quiz and share it with you friends and family. This is a hand crafted puzzle that can be played anywhere easily. We promise to bring you more of these amazing quizzes in the future. Till then enjoy playing the best friend quiz. You can share these quizzes with your friends via whatsapp, instagram and other social media apps.</p>

<ul className='list-group'>
<li className="list-group-item list-group-item-success">1. How do I check my scoreboard?</li>
<li className="list-group-item">Open your quiz URL in the same browser where you had created the quiz. Then scroll down to check your scoreboard. 
For example: If you have created quiz in chrome browser, then open your quiz URL in chrome and scroll down to check your scoreboard.</li>
<li className="list-group-item list-group-item-primary">2. How do I create my quiz?</li>
<li className="list-group-item">Creating your quiz is very simple. Even a toddler can also create his own quiz. Just follow the steps mentioned steps on the home page to play the quiz.</li>
<li className="list-group-item list-group-item-danger">3. How do I delete my quiz?</li>
<li className="list-group-item">Simply visit the link on the same browser. You will find an option to delete your quiz. From there you can simply delete the quiz.</li>
  
</ul>

<p> If you have any other questions you can simply reach us via E-mail. We will be happy to answer all your queries.
</p>
<p>
For any questions related to the quizzes, privacy policy or any random thing:
You can directly reach us via mail at digitrexmedia123@gmail.com
</p>

</div>
<div className='col-2 col-sm-2 col-lg-4 '></div>
</div>
     <div className='col-1 col-sm-2 col-lg-2'></div>
     </div>
  
    </div>
  );
      
}  
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default withLocalize(connect(mapStateToProps, {saveName, changeLanguage})(App));
