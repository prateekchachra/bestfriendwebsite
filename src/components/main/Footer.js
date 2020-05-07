//import liraries
import React, { Component } from 'react';
import { Translate } from "react-localize-redux";

import styles from '../../assets/styles/footer.css'
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
              <div className='col-3 col-sm-3 col-lg-4 '></div>
            <div className="text-center col-6 col-sm-6 col-lg-4" style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  
                }}>
                <p style={{marginTop: 24}}>
                <Translate id="footer.description"/>
                </p>
                </div>
                <div className='col-3 col-sm-3 col-lg-4 '></div>
                </div>
                <div style={{
                    width,
                    height: 1,
                    backgroundColor: '#a0a0a0',
                    marginBottom: 24,
                    marginTop: 200
                }}></div>
                <div className='row'>
              <div className='col-4 col-sm-3 col-lg-4'></div>
               

                <div className='text-center col-4 col-sm-6 col-lg-4'>

                <a href='/about-us'>
                <p><Translate id="footer.aboutus"/></p>
                </a>
                <a href='/contact-us'>
                <p><Translate id="footer.contactus"/></p>
                </a>
                <a href='/faq'>
                <p><Translate id="footer.faq"/></p>
                </a>
                <a href='/privacy'>
                <p><Translate id="footer.privacy"/></p>
                </a>

                </div>
                <div className='text-center col-4 col-sm-3 col-lg-4'>
                </div>
             
            </div>
            </div>
        );
    }
}

//make this component available to the app
export default Footer;
