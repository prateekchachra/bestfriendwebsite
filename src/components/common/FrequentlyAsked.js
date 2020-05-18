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
            <h1 style={{marginBottom: 48}} className='text-center'>Frequently Asked Questions</h1>
          <ul className='list-group'>
          <li class="list-group-item list-group-item-success">1. How do I check my scoreboard?</li>
          <li class="list-group-item">Open your quiz URL in the same browser where you had created the quiz. Then scroll down to check your scoreboard. 
For example: If you have created quiz in chrome browser, then open your quiz URL in chrome and scroll down to check your scoreboard.</li>
<li class="list-group-item list-group-item-primary">2. How do I create my quiz?</li>
<li class="list-group-item">Creating your quiz is very simple. Even a toddler can also create his own quiz. Just follow the steps mentioned steps on the home page to play the quiz.</li>
<li class="list-group-item list-group-item-danger">3. How do I delete my quiz?</li>
<li class="list-group-item">Simply visit the link on the same browser. You will find an option to delete your quiz. From there you can simply delete the quiz.</li>
   
          </ul>

<p style={{
    marginTop: 48
}}>
If you have any other questions you can simply reach us via E-mail. We will be happy to answer all your queries.
</p>
            </div>
        );
    }
}


//make this component available to the app
export default AboutUs;
