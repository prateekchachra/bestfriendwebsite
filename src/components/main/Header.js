import React, {Component} from 'react';
import { colors } from '../../assets/styles/theme';



export default class Header extends Component {


    render(){

        return (
 
              
            <h4  className='text-center' style={{
                backgroundColor: colors.ThemeColor,
                textAlign: 'flex-start',
                color: 'white',
                paddingTop: 18,
                paddingBottom: 18,
                paddingLeft: 16,
                // fontSize: 16
            }}>
                  {/* <img className='img-fluid' src={require('../../assets/img/header-img.png')}
                  style={{width: 120,marginRight: 8,}} /> */}
               Best Friend Challenge 2020
            </h4>
        )
    }

}