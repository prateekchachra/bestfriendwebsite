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

                <p style={{marginTop: 24}}>

                  <p>
                  <p>Select your Country, Enter your Name, Email, Create your Quiz and Share it with your friends on Facebook or Whatsapp. Once your friends attempt the quiz you will see the results on leaderboard. </p>
                <p>Movie Mantra Is a fun quiz site which lets you know who is your true friend and who knows the most about you. You can create your own quiz and share it with you friends and family. This is a hand crafted puzzle that can be played anywhere easily. We promise to bring you more of these amazing quizzes in the future. Till then enjoy playing the best friend quiz. You can share these quizzes with your friends via whatsapp, instagram and other social media apps.</p>
             
                  <ul className='list-group'>
                  <li class="list-group-item list-group-item-success">1. How do I check my scoreboard?</li>
                  <li class="list-group-item">Open your quiz URL in the same browser where you had created the quiz. Then scroll down to check your scoreboard. 
                  For example: If you have created quiz in chrome browser, then open your quiz URL in chrome and scroll down to check your scoreboard.</li>
                  <li class="list-group-item list-group-item-primary">2. How do I create my quiz?</li>
                  <li class="list-group-item">Creating your quiz is very simple. Even a toddler can also create his own quiz. Just follow the steps mentioned steps on the home page to play the quiz.</li>
                  <li class="list-group-item list-group-item-danger">3. How do I delete my quiz?</li>
                  <li class="list-group-item">Simply visit the link on the same browser. You will find an option to delete your quiz. From there you can simply delete the quiz.</li>
                    
                  </ul>
               
               <p> If you have any other questions you can simply reach us via E-mail. We will be happy to answer all your queries.
               </p>
                <p>
                For any questions related to the quizzes, privacy policy or any random thing:
                You can directly reach us via mail at digitrexmedia123@gmail.com
                  </p>
                  </p>
                <Translate id="footer.description"/>
               
                </p>
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
