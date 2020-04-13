import React, {Component} from 'react';
import Box from '../components/main/Box';
import styles from '../assets/styles/quiz.css';
import {firebaseConfig} from '../assets/firebase-config'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {questions} from '../assets/questions'
import { css } from "@emotion/core";
import Question from './components/Question';
import RingLoader from "react-spinners/RingLoader";
import Circles from '../components/main/Circles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

class Quiz extends Component {

    constructor(props){
        super(props);
        this.state = {
            questionsList: questions,
            askedQuestions: [],
            skippedQuestions: [],
            answers: [],
            activeItem: 1,
            width: 0, height: 0, 
            saveQuizProcessing: false,
            savedQuiz: false,
            quizKey: ''
        }
    }

      
      componentDidMount() {
        this.updateWindowDimensions();
       firebase.initializeApp(firebaseConfig);
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions = () =>  {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }
    
      receiveAnswerFromClickEvent= (id, answerId) => {
        const {answers, questionsList, askedQuestions, activeItem} = this.state;

        askedQuestions.push(questionsList[0])
        answers.push({question: id,answer: answerId})

        if(activeItem === 20){

      this.setState({saveQuizProcessing: true, askedQuestions, answers })
      const databaseRef = firebase.database().ref();

      const quizzesRef = databaseRef.child("quizzes")
          
        quizzesRef.push({
          name: this.props.main.name,
          answers,
          scoreTable: []
        }).then(snap => {
          this.setState({savedQuiz: true, saveQuizProcessing: false, quizKey: snap.key})
        }).catch(err => console.log(err))
          return;
      }

        let updatedQuestionsList = questionsList.slice(1)
        
        this.setState({answers, questionsList: updatedQuestionsList,
        askedQuestions, activeItem: activeItem + 1})

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
        const {questionsList, width, activeItem, saveQuizProcessing, savedQuiz, quizKey} = this.state;

      const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

        return(
           <Box style={{
               width: width/2
           }}>

           {!saveQuizProcessing ?  (
           
           <>
          {!savedQuiz ? (<>
       <Circles />
               <div style={{marginBottom: 24, marginTop: 8}}>
                <ul className="list">

                  {arr.slice(0,15).map((item, index) => {
                    let calculatedClassName = item === activeItem  ? 'list-item active' :  'list-item'; 
                    return(  <li id={`number_${item}`}  key={`number_${item}`}  className={calculatedClassName}>{item}</li>)
                  })}
                    </ul>
                    <ul className="list">
                    {arr.slice(15).map((item, index) => {
                    let calculatedClassName = item === activeItem  ? 'list-item active' :  'list-item'; 
                    return(  <li id={`number_${item}`} key={`number_${item}`} className={calculatedClassName}>{item}</li>)
                  })}
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
            sendBackAnswer={this.receiveAnswerFromClickEvent}
            />
            </>) : (
              <div>
                <p>{quizKey}</p>
              </div>
            )}
            </>) : (

              <div className='text-center' style={{
                paddingBottom: 100
              }}>
                <p className='title' style={{
                  marginTop: 14
                }}>Please Wait...</p>
                <p className='title'>Creating Quiz...</p>
                <div style={{alignSelf: 'center'}}>
                <RingLoader
                css={override}
                  size={120}
                  color={"rgb(54,218,183)"}
                  loading={true}
                />
                </div>
              </div>
            )}
           </Box>

        );
        
    }
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {})(Quiz)