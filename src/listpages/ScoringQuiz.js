import React, {Component} from 'react';
import Box from '../components/main/Box';
import styles from '../assets/styles/quiz.css';
import firebase from '../utils/firebaseConfig'
import ReactSpeedometer from "react-d3-speedometer"
import ReactGA from 'react-ga';
import {OverlayTrigger, Popover, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {questions} from '../assets/questions'
import _ from 'lodash'
import { css } from "@emotion/core";
import Question from './components/Question';
import RingLoader from "react-spinners/RingLoader";
import Circles from '../components/main/Circles';
import { colors } from '../assets/styles/theme';

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

        super(props);

        const {match: {params}, history} = props;

        if(params.quizId === null || params.quizId === ''){
          history.push('/')
        }
        this.state = {
            questionsListForScoring: [],
            answers: [],
            answersByGuest: [],

            activeItem: 1,
            width: 0, height: 0,
            calculateScoreProcessing: false,
            hasQuizStarted: false,
            savedScore: false,
            activeQuestion: 0,
            showCreateQuizPopup: false,
            totalScore: 0,
            errors: {},
            name: '',
            quizId: '',
            scores: [],
            guestName: ''
        }
    }




    makeGrammaticallyCorrect = (title, name, iteration) => {
      let updatedTitle = ''
   
      if(title.includes('Do you')){
        
        updatedTitle = title.replace('Do you', 'Does ' +  (iteration === 2 ? 'he/she' : name))
    }
    else if(title.includes('do you')){
         updatedTitle =  title.replace('do you','does ' + (iteration === 2 ? 'he/she' : name))
     }
     else if(title.includes('to you')){
         updatedTitle =  title.replace('to you','to ' + (iteration === 2 ? 'him/her' : name))
     }
     
     else if(title.includes('are you')){
         updatedTitle =  title.replace('are you','is ' + (iteration === 2 ? 'he/she' : name))
     }
     else if(title.includes('you ')){
         updatedTitle =  title.replace('you ', (iteration === 2 ? 'he/she' : name) + ' ')
     }
     else if(title.includes('You ')){
         updatedTitle =  title.replace('You ', (iteration === 2 ? 'He/She' : name) + ' ')
     }
    else if(title.includes('your ')){
        updatedTitle =  title.replace('your ', (iteration === 2 ? 'his/her ' : name + "'s "))
    }
    else {
        updatedTitle = title;
    }

    return updatedTitle;
    }

    componentWillMount() {
        const {match: {params}, history} = this.props;
    
         const quizRef = firebase.database().ref(`/quizzes/-${params.quizId}`)
        quizRef.once('value').then(snapshot => {
           let data = snapshot.val() ? snapshot.val() : null;
         
           if(data === null){
             history.push('/')
           }
           else {
               const {answers, name, scores } = data;
                let updatedQuestions = [];
                questions.map((item,index) => {
                 
                    const {title} = item;
                    let updatedItem = {...item};
              
                    let updatedTitle = this.makeGrammaticallyCorrect(title, name, 1)



                updatedItem.title = this.makeGrammaticallyCorrect(updatedTitle, name,2 );
                updatedQuestions.push(updatedItem)
                })
                if(scores){
                  scores.sort((b,a) => a.score - b.score)
                }
                this.setState({answers,quizRef, name,scores: scores ? scores : [],
       activeQuestion: answers[0].question, quizId: params.quizId,
                questionsListForScoring: updatedQuestions})
           }
        })
          
      }
      componentDidMount() {
        this.updateWindowDimensions();
        ReactGA.pageview(window.location.pathname + window.location.search);
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions = () =>  {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

      copyToClipboard = () => {

        ReactGA.event({
          category: 'Button Click',
          action: 'Copied the link to share',
          
        })
        const el = this.textArea
        el.select()
        document.execCommand("copy")
        this.setState({copySuccess: true})
      }
    
      receiveAnswerFromClickEvent= (id, answerId, isRight) => {


        
        const {activeItem, guestName, totalScore, answers,scores, answersByGuest, quizRef} = this.state;

        ReactGA.event({
                  category: 'Question clicked - Solution',
                  action: 'Clicked a question while solving the quiz',
                  value: activeItem
                });

        answersByGuest.push({answer: answerId, question: id})
        if(activeItem ===20){
           let netTotal = isRight ? totalScore + 1 : totalScore
          this.setState({totalScore: netTotal, calculateScoreProcessing: true})

          scores.push({name: guestName, score:netTotal, answers: answersByGuest})
            quizRef.update({
              scores
            }).then(snap => {
              this.setState({savedScore: true, }, () => setTimeout(() => {
                this.setState({showCreateQuizPopup: true})
              }, 2000))}
              );
        }
        else 
       this.setState({totalScore: isRight ? totalScore + 1 : totalScore, activeQuestion: answers[activeItem].question,
    activeItem: activeItem + 1})
      }
 
    
    render(){
        const {questionsListForScoring, name,
            guestName,scores,totalScore,
            showCreateQuizPopup,
            quizId,
            activeQuestion, answers,savedScore,
             activeItem,
              calculateScoreProcessing, hasQuizStarted, errors} = this.state;

      const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

        return(
          <div className='container'>
                    <Modal
                   centered
        show={showCreateQuizPopup}
        onHide={() => this.setState({showCreateQuizPopup: false})}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
         Click Below To Create Your Own Quiz Now!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <button type="button"
        className="btn btn-block" style={{
                    backgroundColor: 'yellowgreen',
                    color: 'white',
                    marginTop: 48,
                    marginBottom: 48,
                    height: 80,
                    fontSize: 18,
                    fontWeight: 'bold'                
                }} onClick={() => {
                  
                    ReactGA.event({
                      category: 'Button Click',
                      action: 'Create A Quiz After Solving One',
                      value: 3
                    });
                  this.props.history.push('/')}}><span>{'\u{1F449}'}</span> Create Your Own Quiz! <span>{'\u{1F448}'}</span> </button>
        </Modal.Body>
      </Modal>
            <div className='row'>
               <div className='col-1 col-sm-2 col-lg-2 '></div>
           <Box classes='col-10 col-sm-8 col-lg-8 box_container' style={{
           
           }}>
           {!calculateScoreProcessing ?  (
           
           <>
          {hasQuizStarted ? (<>
      
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
        
                </div>

            <Question 
            activeQuestion={questionsListForScoring[activeQuestion - 1]}
            answer={answers[activeItem - 1]}
            sendBackAnswer={this.receiveAnswerFromClickEvent}
            />
            </>) : (
                <>
           {name === '' ? (<div style={{padding: 12}}></div>) :
          
            <form onSubmit={(event) => {
                event.preventDefault();
            if(name === ''){
                errors['name'] = 'Name cannot be empty!'
                this.setState({errors})
            }
            else {

          ReactGA.event({
            category: 'Button Click',
            action: 'Submitted Name And Played Quiz',
            value: 3
          });
            this.setState({hasQuizStarted: true})
            }
            }}>

              <Circles />
              <div className='text-center'>
              <p className='text-center font-weight-bold'
                    style={{
                        fontSize: 24
                    }}>
                        Best Friend Challenge 2020
                    </p>

                <p style={{

                  fontSize: 20,
                  marginTop: 12,
                  fontWeight: 'bold'
                }}>How well do you know {name}?</p>
                </div>
                 <div className="form-group">
                    <label className='font-weight-bold' htmlFor="nameInput" style={{
                        fontSize: 20
                    }}>Enter your Full Name :</label>
                    <input type="name" className="form-control" id="nameInput"
                    onChange={(event) => this.setState({guestName: event.target.value, errors: {}})}
                    value={guestName}
                    aria-describedby="emailHelp" placeholder="Full Name" />
                </div>
                {errors['name'] && <p style={{
                    color: 'red',
                    fontSize: 18
                }}>Name cannot be empty</p>}
                <button type="submit" value="Submit" className="btn btn-block" style={{
                    backgroundColor: colors.ThemeColor,
                    color: 'white'
                }}>Start</button>
                <div className='text-center' style={{marginTop: 12, marginBottom: 12}}>


                  <div>
                  <p className='text-center font-weight-bold'
                    style={{
                        fontSize: 24
                    }}>
                        Who Knows {name} Best?
                    </p>
                    <table className='table table-hover table-bordered'
                    style={{backgroundColor: '#fff'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map((item, index) =>(
                               <tr>
                               <td> <Link to={{
                              pathname: `/quiz-result/${item.name}/${quizId}`,
                              state: {
                                score: item
                              }
                            }}>{item.name} </Link></td>
                               <td>{item.score}</td>
                               </tr>
                        ))}
                     
                    
                        </tbody>

                    </table>
                  </div>
                    </div>
                    </form>
                    }
                </>

            )}
            </>) : (
              <>
            {savedScore ? (

              <div className='text-center'>

                <p style={{
                  marginTop: 24,
                  fontWeight: 'bold',
                  fontSize: 26
                }}>
                  Score: {totalScore}
                </p>
                <ReactSpeedometer  maxValue={20}
                value={totalScore}
                width={280}
                
                minValue={0}
                needleColor={colors.ThemeColor}
                currentValueText={totalScore.toString()}
                segments={3}
                segmentColors={[ "tomato", "gold", "limegreen"]}
                customSegmentStops={[0,5,15,20]}
                customSegmentLabels={[
                  {
                    text: "Low",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Medium",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "High",
                    position: "INSIDE",
                    color: "#555",
                  },
               
                ]}
                />
                  <button type="button" className="btn btn-block" style={{
                    backgroundColor: 'yellowgreen',
                    color: 'white',
                    marginTop: -96,
                    marginBottom: 24,
                    height: 80,
                    fontSize: 18, 
                    fontWeight: 'bold'                  
                }} onClick={() => {
                  
                    ReactGA.event({
                      category: 'Button Click',
                      action: 'Create A Quiz After Solving One',
                      value: 3
                    });
                  this.props.history.push('/')}}><span>{'\u{1F449}'}</span> Create Your Own Quiz! <span>{'\u{1F448}'}</span> </button>
                   <div>
                  <p className='text-center font-weight-bold'
                    style={{
                        fontSize: 24
                    }}>
                        Who Knows {name} Best?
                    </p>
                    <table className='table table-hover table-bordered'
                    style={{backgroundColor: '#fff'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scores.map((item, index) =>(
                               <tr style={{backgroundColor: item.name === guestName ? 'turqoise' : null}}>
                               <td> <Link to={{
                              pathname: `/quiz-result/${item.name}/${quizId}`,
                              state: {
                                score: item
                              }
                            }}
                            onClick={() => 
                          ReactGA.event({
                            category: 'Button Click',
                            action: 'Viewed A Quiz Result',
                            value: item.name
                          })
                            }
                            >{item.name} </Link></td>
                               <td>{item.score}</td>
                               </tr>
                        ))}
                     
                    
                        </tbody>

                    </table>
                  </div>
              </div>
            ) : (  <div className='text-center' style={{
                paddingBottom: 100
              }}>
                <p className='title' style={{
                  marginTop: 14
                }}>Please Wait...</p>
                <p className='title'>Calculating Score...</p>
                <div style={{alignSelf: 'center'}}>
                <RingLoader
                css={override}
                  size={120}
                  color={"rgb(54,218,183)"}
                  loading={true}
                />
                </div>
              </div>)}
              </>
            )}
           </Box>
           <div className='col-1 col-sm-2 col-lg-2'></div>
           </div>
           </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {})(Quiz)