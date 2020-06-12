//import liraries
import React, { Component } from 'react';
import { Translate } from "react-localize-redux";
import AdSense from 'react-adsense';
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
              <div className='col-1 col-sm-2 col-lg-2 '></div>
              <div className='col-10 col-sm-8 col-lg-8'>
          <p className='text-center'>
          {/* <AdSense.Google
                client='ca-pub-4735074613807586'
                slot='9097993451'
                style={{ display: 'block' }}
                format='auto'
                responsive='true'
              /> */}
          </p>

              </div>
              <div className='col-1 col-sm-2 col-lg-2 '></div>
              </div>
              <div className='row'>
           
              <div className='col-2 col-sm-2 col-lg-4 '></div>
            <div className="text-center col-8 col-sm-8 col-lg-6" style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  
                }}>

                <Translate id="footer.description"/>
               
                </div>
                <div className='col-2 col-sm-2 col-lg-4 '></div>
                </div>
                <div style={{
                    width,
                    height: 1,
                    backgroundColor: '#a0a0a0',
                    marginBottom: 24,
                    marginTop: 24
                }}></div>
                <div className='row'>
              <div className='col-2 col-sm-3 col-lg-4'></div>
               

                <div className='text-center col-8 col-sm-6 col-lg-4'>
                <p>
                <a href='/about-us'>
             <Translate id="footer.aboutus"/>
                </a>
              
                <a href='/contact-us'>
                <Translate id="footer.contactus"/>
             
                </a>
                </p>
                <a href='/faq'>
                <p><Translate id="footer.faq"/></p>
                </a>
                <a href='/privacy'>
                <p><Translate id="footer.privacy"/></p>
                </a>

                </div>
                <div className='text-center col-2 col-sm-3 col-lg-4'>
                </div>
             
            </div>
            </div>
        );
    }
}

//make this component available to the app
export default Footer;
