//import liraries
import React, { Component } from 'react';
import styles from './circles.css'
// create a component
class Circles extends Component {
    render() {
        const arr = [1,2,3,4,5,6,7]
        return (
            <div className='circles' style={{marginTop: 24}}>
            <ul className="circles">
              {arr.map((item, index )=> (
                    <li id={'circle_' + item }  key={`number_${item}`} className="circle" />
              ))}
                
            </ul>
          </div>
        );
    }
}

export default Circles;
