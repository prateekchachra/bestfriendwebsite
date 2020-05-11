import React, {Component} from 'react';
import { colors } from '../../assets/styles/theme';



export default class Header extends Component {


    render(){

        return (
 
              
            <h4  style={{
                backgroundColor: colors.ThemeColor,
                textAlign: 'flex-start',
                color: 'white',
                paddingTop: 6,
                paddingBottom: 6,
                fontSize: 16
            }}>
                  <img className='img-fluid' src={require('../../assets/img/header-img.png')}
                  style={{width: 120,marginRight: 8,}} />
               Best Friend Challenge 2020
            </h4>
        )
    }

}