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
                
            }}>
            <h1 style={{marginBottom: 48}} className='text-center'>Privacy Policy</h1>
            <p style={{marginBottom: 96}}>At Quiz Junction, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Dare Quiz and how we use it.</p>
            <h3 style={{
                fontStyle: 'italic'
            }}>Log Files</h3>
            <p style={{
                fontStyle: 'italic',
                marginBottom: 48,
                fontSize: 14,
                opacity: 0.6
            }}>Dare Quiz follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
            
            <h3 style={{
                fontStyle: 'italic'
            }}>Cookies and Web Beacons</h3>
            <p style={{
                fontStyle: 'italic',
                marginBottom: 48,
                fontSize: 14,
                opacity: 0.6
            }}>Like any other website, Dare Quiz uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            
            <h3 style={{
                fontStyle: 'italic'
            }}>Google DoubleClick DART Cookie</h3>
           <p style={{
               fontStyle: 'italic',
               marginBottom: 48,
               fontSize: 14,
               opacity: 0.6
           }}>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL</p>
            </div>
        );
    }
}


//make this component available to the app
export default AboutUs;
