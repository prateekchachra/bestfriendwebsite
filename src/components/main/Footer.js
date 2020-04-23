//import liraries
import React, { Component } from 'react';
// create a component
class Footer extends Component {
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
    
    
    render() {
        const {width} = this.state;
        return (
            <div className='container'>
              <div className='row'>
              <div className='col-xs-4 col-sm-3 col-lg-4 '></div>
            <div className="text-center col-xs-4 col-sm-6 col-lg-4" style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  
                }}>
                <p style={{marginTop: 24}}>
                Select your Country, Enter your Name, Email, Create your Quiz and Share it with your friends on Facebook or Whatsapp. Once your friends attempt the quiz you will see the results on leaderboard.
                </p>
                </div>
                <div className='col-xs-4 col-sm-3 col-lg-4 '></div>
                </div>
                <div style={{
                    width,
                    height: 1,
                    backgroundColor: '#a0a0a0',
                    marginBottom: 24,
                    marginTop: 200
                }}></div>
                <div className='row'>
              <div className='col-xs-4 col-sm-3 col-lg-4'></div>
               

                <div className='text-center col-xs-4 col-sm-6 col-lg-4'>

                <p>Contact</p>
                </div>
                <div className='text-center col-xs-4 col-sm-3 col-lg-4'>
                </div>
             
            </div>
            </div>
        );
    }
}

//make this component available to the app
export default Footer;
