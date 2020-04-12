//import liraries
import React, { Component } from 'react';
import styles from '../../assets/styles/question.css'
class Question extends Component {


    constructor(props){
        super(props)

    }


    renderOption = (option) => ( 
        <a  href="" onClick={() => {
            console.log(option)
        }}>
        <div 
        className='question-box card' style={{backgroundColor: '#f6f6f6',
   }} >
        <img style={{
            borderRadius: 15,
            marginTop: 14,
          
        }} src={option.image} />
        <p style={{
              paddingBottom: 8,
              marginTop: 8
        }}>{option.title}</p>

        </div>
        </a>)

    render() {

        const {activeQuestion} = this.props;

        const {title, options} = activeQuestion
        return (
           <div className='text-center'>
               <p style={{
                   fontSize: 24,
                   fontWeight: 'bold',
                   color: '#4a4a4a',
                 
               }}>{title}</p>

               <div className='options-list'>
                   {options.map(option => this.renderOption(option))}
               </div>
           </div>
        );
    }
}


//make this component available to the app
export default Question;
