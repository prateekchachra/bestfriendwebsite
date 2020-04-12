//import liraries
import React, { Component } from 'react';
import styles from './box.css'
// create a component
class MyClass extends Component {
    render() {

        const {children, style} = this.props
        return (

          <div className='container' style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e9e9e9',
            borderWidth: 2,
            borderColor: '#000',
            ...style
        }}>
          
              {children}
          </div>
        );
    }
}


//make this component available to the app
export default MyClass;
