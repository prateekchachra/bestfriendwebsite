import React, {Component} from 'react';
import Box from '../components/main/Box';
import styles from '../assets/styles/quiz.css';
import firebase from '../utils/firebaseConfig'
import {OverlayTrigger, Popover} from 'react-bootstrap';

import {connect} from 'react-redux'
import {questions} from '../assets/questions'
import _ from 'lodash'
import { css } from "@emotion/core";
import Question from './components/Question';
import RingLoader from "react-spinners/RingLoader";
import Circles from '../components/main/Circles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const popover = (
  <Popover id="popover-positioned-bottom"
  placement={'bottom'}>
  
    <Popover.Content>
     Copied successfully!
    </Popover.Content>
  </Popover>
);
class Quiz extends Component {

    constructor(props){

      const {main} = props;
      if(!main.name || main.name === ''){
        props.history.push('/')
      }
        super(props);
        this.state = {
            questionsList: _.shuffle(questions),
            askedQuestions: [],
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
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions = () =>  {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      copyToClipboard = () => {
        const el = this.textArea
        el.select()
        document.execCommand("copy")
        this.setState({copySuccess: true})
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
          scores: []
        }).then(snap => {
          this.setState({savedQuiz: true, saveQuizProcessing: false, quizKey: snap.key})
        }).catch(err => console.log(err))
          return;
      }

        let updatedQuestionsList = questionsList.slice(1)
        
        this.setState({answers, questionsList: updatedQuestionsList,
        askedQuestions, activeItem: activeItem + 1})

      }
      handleClick =() => {

      
        const {questionsList} = this.state;
        let skippedQuestion = questionsList.splice(0, 1)
        questionsList.push(skippedQuestion)

         this.setState({questionsList})

    }
    
    render(){
        const {questionsList, width, activeItem, saveQuizProcessing, savedQuiz, quizKey} = this.state;

      const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

        return(
          <div className='container'>
            <div className='row'>
               <div className='col-xs-2 col-sm-2 col-lg-2 '></div>
           <Box classes='col-xs-8 col-sm-8 col-lg-8 box_container' style={{
           
           }}>
              <Circles />
           {!saveQuizProcessing ?  (
           
           <>
          {!savedQuiz ? (<>
      
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
              <div className='text-center'>
                <p style={{

                  color: 'maroon',
                  fontSize: 24,
                  fontWeight: 'bold'
                }}>Your Challenge is Ready</p>
                <p style={{
                  color: '#4a4a4a',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>Share this link with your friends</p>

                <textarea
                onChange={(event) => {}}
                ref={(textarea) => this.textArea = textarea}
                value={`${window.location.origin}/quiz/${quizKey.slice(1)}`}
                className='form-control' />
                <div className='text-center' style={{marginTop: 12, marginBottom: 12}}>

                <OverlayTrigger trigger="click" placement="right" overlay={popover}
                 trigger="click"
                 key={'bottom'}
                 placement={'bottom'}>
                    <button type="button" className="btn btn-center"
                    
                    style={{
                        backgroundColor: 'maroon',
                        color: 'white',
                        textAlign: 'center'
                    }} onClick={this.copyToClipboard}>Copy This Link</button>
                  </OverlayTrigger>

                  <div>


                  </div>
                    </div>
               


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
           <div className='col-xs-2 col-sm-2 col-lg-2'></div>
           </div>
           </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {})(Quiz)