//import liraries
import React, { Component } from 'react';
import Header from '../main/Header';

import { Translate, withLocalize } from "react-localize-redux";
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
            <h1 style={{marginBottom: 48}} className='text-center'><Translate id="footer.aboutus" /></h1>
            <Translate id="aboutus" />
            </div>
        );
    }
}


//make this component available to the app
export default AboutUs;
