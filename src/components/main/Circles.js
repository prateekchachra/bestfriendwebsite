//import liraries
import React, { Component } from 'react';
import styles from './circles.css'
// create a component
class Circles extends Component {
    render() {
        const arr = [1,2,3,4,5,6,7]
        return (
            <div className='circles'>
           
            <img 
             className='img-fluid'
            src={require('../../assets/img/header-img.png')} 
              style={{width: 380}}/>
          </div>
        );
    }
}

export default Circles;
