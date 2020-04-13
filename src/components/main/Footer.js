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
            <div>
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
                <div style={{
                    width,
                    height: 1,
                    backgroundColor: '#a0a0a0',
                    marginBottom: 24,
                    marginTop: 200
                }}></div>
                <div className='text-center'>

                <p>Contact</p>
                </div>
             
            </div>
        );
    }
}

//make this component available to the app
export default Footer;
