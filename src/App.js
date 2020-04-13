import React from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './components/main/Header';
import Box from './components/main/Box';
import {saveName, changeLanguage} from './listpages/actions'
 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, language:'en', name: '' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  onChange = (event) => {
    const{value} = event.target
    this.props.changeLanguage(value)
    this.setState({language: value})
  }
  render(){

    const {width, height, language, name} = this.state;
  return (
    <div className="App">
     <Box style={{padding: 20, width: width/2}}>
       <p className='text-center font-weight-bold'
       style={{
         fontSize: 24
       }}>
         Super dare of 2020
       </p>
      <form>
      <div className="form-group">
          <label for="nameInput" className='font-weight-bold'  style={{
         fontSize: 20
       }}>Select Language :</label>
          <select className="browser-default custom-select" onChange={this.onChange} value={language}>
          <option value='en'>English</option><option value='de'>Deutsch</option><option value='es'>Español</option><option value='fr'>Français</option><option value='id'>Bahasa Indonesia</option><option value='it'>Italiano</option><option value='pt'>Português</option><option value='ru'>Русский</option><option value='tr'>Türkçe</option><option value='ar'>عربى</option><option value='fi'>Suomen Kieli</option><option value='ro'>Română</option><option value='nl'>Nederlands (Dutch)</option><option value='pl'>Polski</option><option value='sv'>Svenska</option><option value='hi'>हिंदी</option><option value='uk'>Украiнська</option><option value='hr'>hrvatski</option><option value='il'>עברית</option><option value='ms'>Bahasa Melayu</option><option value='jp'>日本語</option><option value='ko'>한국어</option><option value='vn'>Tiếng Việt</option><option value='th'>ไทย</option>
            </select>
        </div>
      <div className="form-group">
          <label className='font-weight-bold' for="nameInput" style={{
            fontSize: 20
          }}>Enter your Full Name :</label>
          <input type="name" className="form-control" id="nameInput"
          onChange={(event) => this.setState({name: event.target.value})}
          value={name}
          aria-describedby="emailHelp" placeholder="Full Name" />
       </div>
      <Link to={location => {
     
        return `/${language}/quiz`;
        
        }}>
       <button type="button" onClick={() => this.props.saveName(name)} className="btn btn-block" style={{
         backgroundColor: 'maroon',
         color: 'white'
       }}>Start</button>
       </Link>
      </form>
     </Box>
  
    </div>
  );
      
}  
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {saveName, changeLanguage})(App);
