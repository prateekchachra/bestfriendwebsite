import React from 'react';
import {connect} from 'react-redux'
import Box from './components/main/Box';
import {saveName, changeLanguage} from './listpages/actions'
import { withLocalize, Translate } from "react-localize-redux";
import Circles from './components/main/Circles';

// will be automatically minified ny webpack
import 'bootstrap/dist/css/bootstrap.css'
 class App extends React.Component {

  constructor(props) {
    super(props);


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
      style={{padding: 20}}>
     <Circles />
       <p className='text-center font-weight-bold'
       style={{
         fontSize: 24
       }}>
        <Translate id="main.title" />
       </p>

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
          <option value='es'>Español</option>
           {/*  <option value='de'>Deutsch</option>
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
         backgroundColor: 'maroon',
         color: 'white'
       }}><Translate id="main.createQuiz" /></button>
  
      </form>
     </Box>
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
