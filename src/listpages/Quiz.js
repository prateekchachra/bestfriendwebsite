import React, {Component} from 'react';
import Box from '../components/main/Box';
import styles from '../assets/styles/quiz.css'
import {questions} from '../assets/questions'
import Question from './components/Question';
export default class Quiz extends Component {

    constructor(props){
        super(props);
        this.state = {
            questionsList: questions,
            askedQuestions: [],
            skippedQuestions: [],
            answers: []

        }
    }

    handleClick = () => {

      
        const {questionsList, skippedQuestions} = this.state;
        if(questionsList.length === 1){

            //SUBMIT LOGIC
            return;
        }
          let updatedQuestionsList = questionsList.slice(1)
        skippedQuestions.push(questionsList[0])
         this.setState({questionsList: updatedQuestionsList, skippedQuestions})

    }
    
    render(){
        const {questionsList, skippedQuestions} = this.state;
         
        return(
           <Box>

            <div className='circles' style={{marginTop: 24}}>
                    <ul className="circles">
                            <li id='circle_1' className="circle" />
                            <li id='circle_2' className="circle" />
                            <li id='circle_3' className="circle" />
                            <li id='circle_4' className="circle" />
                            <li id='circle_5' className="circle" />
                            <li id='circle_6' className="circle" />
                            <li id='circle_7' className="circle" />
                    </ul>
            </div>
               <div style={{marginBottom: 24, marginTop: 8}}>
                <ul className="list">
                    <li id='number_1' className="list-item active">1</li>
                    <li id='number_2' className="list-item">2</li>
                    <li className="list-item" id='number_3'>3</li>
                    <li className="list-item" id='number_4'>4</li>
                    <li className="list-item" id='number_5'>5</li>
          
                    <li className="list-item" id='number_6'>6</li>
                    <li className="list-item" id='number_7'>7</li>
                    <li className="list-item" id='number_8'>8</li>
                    <li className="list-item" id='number_9'>9</li>
                    <li className="list-item" id='number_10'>10</li>
                
                    <li className="list-item" id='number_11'>11</li>
                    <li className="list-item" id='number_12'>12</li>
                    <li className="list-item" id='number_13'>13</li>
                    <li className="list-item" id='number_14'>14</li>
                    <li className="list-item" id='number_15'>15</li>
                    </ul>
            <ul className="list">
                    <li className="list-item" id='number_16'>16</li>
                    <li className="list-item" id='number_17'>17</li>
                    <li className="list-item" id='number_18'>18</li>
                    <li className="list-item" id='number_19'>19</li>
                    <li className="list-item" id='number_20'>20</li>
                </ul>
            
            <div className='text-center' style={{marginTop: 36}}>
                    <button type="button" className="btn btn-center" style={{
                        backgroundColor: 'maroon',
                        color: 'white',
                        textAlign: 'center'
                    }} onClick={this.handleClick}>Skip this Question</button>
                    </div>
                </div>

            <Question 
            activeQuestion={questionsList[0]}
            
            />
           </Box>

        );
        
    }
}