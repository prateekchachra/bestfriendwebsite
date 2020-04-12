import React from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom'
import Header from './components/main/Header';
import Box from './components/main/Box';

 class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, language:'en' };
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
    this.setState({language:event.target.value})
  }
  render(){

    const {width, height, language} = this.state;
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
          <label for="exampleInputEmail1" className='font-weight-bold'  style={{
         fontSize: 20
       }}>Select Language :</label>
          <select className="browser-default custom-select" onChange={this.onChange} value={language}>
          <option value='en'>English</option><option value='de'>Deutsch</option><option value='es'>Español</option><option value='fr'>Français</option><option value='id'>Bahasa Indonesia</option><option value='it'>Italiano</option><option value='pt'>Português</option><option value='ru'>Русский</option><option value='tr'>Türkçe</option><option value='ar'>عربى</option><option value='fi'>Suomen Kieli</option><option value='ro'>Română</option><option value='nl'>Nederlands (Dutch)</option><option value='pl'>Polski</option><option value='sv'>Svenska</option><option value='hi'>हिंदी</option><option value='uk'>Украiнська</option><option value='hr'>hrvatski</option><option value='il'>עברית</option><option value='ms'>Bahasa Melayu</option><option value='jp'>日本語</option><option value='ko'>한국어</option><option value='vn'>Tiếng Việt</option><option value='th'>ไทย</option>
            </select>
        </div>
      <div className="form-group">
          <label className='font-weight-bold' for="exampleInputEmail1" style={{
            fontSize: 20
          }}>Enter your Full Name :</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name" />
       </div>
      <Link to={`/${language}/quiz`}>
       <button type="button" className="btn btn-block" style={{
         backgroundColor: 'maroon',
         color: 'white'
       }}>Start</button>
       </Link>
      </form>
     </Box>
     <div className="text-center" style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/2,
        marginLeft: width/4
     }}>
      <p style={{marginTop: 24}}>
      Select your Country, Enter your Name, Email, Create your Quiz and Share it with your friends on Facebook or Whatsapp. Once your friends attempt the quiz you will see the results on leaderboard.
      </p>
      </div>
    </div>
  );
      
}  
}

export default App;
