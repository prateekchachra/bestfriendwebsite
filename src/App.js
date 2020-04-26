import React from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './components/main/Header';
import Box from './components/main/Box';
import {saveName, changeLanguage} from './listpages/actions'
import Circles from './components/main/Circles';
 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {language:'en', name: '', errors: {} };
  }
  


  onChange = (event) => {
    const{value} = event.target
    this.props.changeLanguage(value)
    this.setState({language: value})
  }
  render(){

    const {language, name, errors} = this.state;
  return (
    <div className="App container">
      <div className='row'>
     <div className="col-md-4 col-sm-3"></div>
     <Box style={{padding: 20}}>
     <Circles />
       <p className='text-center font-weight-bold'
       style={{
         fontSize: 24
       }}>
         Super dare of 2020
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
       }}>Select Language :</label>
          <select className="browser-default custom-select" onChange={this.onChange} value={language}>
          <option value='en'>English</option><option value='de'>Deutsch</option><option value='es'>Español</option><option value='fr'>Français</option><option value='id'>Bahasa Indonesia</option><option value='it'>Italiano</option><option value='pt'>Português</option><option value='ru'>Русский</option><option value='tr'>Türkçe</option><option value='ar'>عربى</option><option value='fi'>Suomen Kieli</option><option value='ro'>Română</option><option value='nl'>Nederlands (Dutch)</option><option value='pl'>Polski</option><option value='sv'>Svenska</option><option value='hi'>हिंदी</option><option value='uk'>Украiнська</option><option value='hr'>hrvatski</option><option value='il'>עברית</option><option value='ms'>Bahasa Melayu</option><option value='jp'>日本語</option><option value='ko'>한국어</option><option value='vn'>Tiếng Việt</option><option value='th'>ไทย</option>
            </select>
        </div>
      <div className="form-group">
          <label className='font-weight-bold' htmlFor="nameInput" style={{
            fontSize: 20
          }}>Enter your Full Name :</label>
          <input type="name" className="form-control" id="nameInput"
          onChange={(event) => this.setState({name: event.target.value, errors: {}})}
          value={name}
          aria-describedby="emailHelp" placeholder="Full Name" />
       </div>
       {errors['name'] && <p style={{
         color: 'red',
         fontSize: 18
       }}>Name cannot be empty</p>}
       <button type="submit" value="Submit" className="btn btn-block" style={{
         backgroundColor: 'maroon',
         color: 'white'
       }}>Start</button>
  
      </form>
     </Box>
     <div className="col-md-4 col-sm-3"></div>
     </div>
    </div>
  );
      
}  
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {saveName, changeLanguage})(App);
