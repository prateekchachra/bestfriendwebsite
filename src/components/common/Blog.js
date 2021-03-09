//import liraries
import React, { Component } from 'react';
import ReactGA from 'react-ga';
// create a component
class AboutUs extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
    render() {
        return (
            <div style={{
                marginTop: 96,
                marginLeft: 60,
                marginRight: 60,
             marginBottom: 192
                
            }} className='text-center'>
            <h1 style={{marginBottom: 48}} className='text-center'>Contact Us</h1>
            For any questions related to the quizzes, privacy policy or any random thing:<br></br>You can directly reach us via mail at 
            <a href='mailto:digitrexmedia123@gmail.com'> digitrexmedia123@gmail.com</a>
            </div>
        );
    }
}


//make this component available to the app
export default AboutUs;
