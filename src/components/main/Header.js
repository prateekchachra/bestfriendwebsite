import React, {Component} from 'react';



export default class Header extends Component {


    render(){

        return (
 
              
            <h4 style={{
                backgroundColor: 'maroon',
                textAlign: 'flex-start',
                color: 'white',
                paddingTop: 6,
                paddingBottom: 6
            }}>
                  <img src={require('../../assets/img/icon.png')}
                  style={{width: 30,marginRight: 14,}} />
                Super Dare of 2020
            </h4>
        )
    }

}