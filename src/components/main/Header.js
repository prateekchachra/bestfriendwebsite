import React, {Component} from 'react';
import { colors } from '../../assets/styles/theme';



export default class Header extends Component {


    render(){

        return (
 
              
            <h4 style={{
                backgroundColor: colors.ThemeColor,
                textAlign: 'flex-start',
                color: 'white',
                paddingTop: 6,
                paddingBottom: 6
            }}>
                  <img src={require('../../assets/img/icon.png')}
                  style={{width: 30,marginRight: 14,}} />
               Best Friend Challenge 2020
            </h4>
        )
    }

}