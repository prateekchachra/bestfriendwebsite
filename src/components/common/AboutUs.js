//import liraries
import React, { Component } from 'react';
import Header from '../main/Header';
// create a component
class AboutUs extends Component {
    render() {
        return (
            <div style={{
                marginTop: 96,
                marginLeft: 60,
                marginRight: 60,
             marginBottom: 192
                
            }}>
            <h1 style={{marginBottom: 48}} className='text-center'>About Us</h1>
             Quiz Junction Is a fun quiz site which lets you know who is your true friend and who knows the most about you. You can create your own quiz and share it with you friends and family. This is a hand crafted puzzle that can be played anywhere easily. We promise to bring you more of these amazing quizzes in the future. Till then enjoy playing the best friend quiz. You can share these quizzes with your friends via whatsapp, instagram and other social media apps.
            </div>
        );
    }
}


//make this component available to the app
export default AboutUs;
