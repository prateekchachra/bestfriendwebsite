//import liraries
import React, { Component } from 'react';
import styles from './box.css'
// create a component
class MyClass extends Component {
    render() {

        const {children, style, classes} = this.props
        return (

          <div className={classes ? classes :  'col-6 col-sm-6 col-lg-6 box_container'} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e8e9f0',
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
