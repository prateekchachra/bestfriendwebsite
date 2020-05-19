import React, {Component} from 'react';
import Box from '../components/main/Box';
import styles from '../assets/styles/quiz.css';
import firebase from '../utils/firebaseConfig'
import {saveName} from '../listpages/actions'
import {OverlayTrigger, Popover, Modal} from 'react-bootstrap';
import * as LoadScript from 'react-load-script';
import {connect} from 'react-redux'
import {questions} from '../assets/questions'
import _ from 'lodash'
import ReactGA from 'react-ga';
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
      const {main} = props;

      let savedQuiz = false;
      let quizKey = ''
      if(!main.name || main.name === ''){
      
        quizKey = localStorage.getItem('quizKey')
        
        if(quizKey){
          let name = localStorage.getItem('quizName')
          this.props.saveName(name)
          savedQuiz = true;
        }
        else {

        props.history.push('/')
        }
      }
        ReactGA.pageview(window.location.pathname + window.location.search);

        this.state = {
            questionsList: _.shuffle(questions),
            askedQuestions: [],
            answers: [],
            activeItem: 1,
            width: 0, height: 0, 
            saveQuizProcessing: false,
            savedQuiz,
            showInstagramModal: false,
            quizKey: quizKey ? quizKey : ''
        }
    }

      
      componentDidMount() {
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
          action: 'Copy Link',
          value: this.state.activeItem
        });

        const el = this.textArea
        el.select()
        document.execCommand("copy")
        this.setState({copySuccess: true})
      }
    
      receiveAnswerFromClickEvent= (id, answerId) => {
        const {answers, questionsList, askedQuestions, activeItem} = this.state;
          
        ReactGA.event({
            category: 'Question',
            action: 'Clicked on question',
            value: activeItem
          });
      
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

          localStorage.setItem('quizName',this.props.main.name);
          localStorage.setItem('quizKey', snap.key);

          this.setState({savedQuiz: true, saveQuizProcessing: false, quizKey: snap.key}, () =>   window.addthis ? 
          window.addthis.layers.refresh() : null)
        }).catch(err => console.log(err))
          return;
      }

        let updatedQuestionsList = questionsList.slice(1)
        
        this.setState({answers, questionsList: updatedQuestionsList,
        askedQuestions, activeItem: activeItem + 1})

      }
      handleClick =() => {

      
        const {questionsList} = this.state;
        ReactGA.event({
          category: 'Question',
          action: 'Skipped a question',
          value: this.state.activeItem
        });
        let skippedQuestion = questionsList.splice(0, 1)
        questionsList.push(skippedQuestion[0])

         this.setState({questionsList})

    }
  
    handleScriptLoad=()=>{    
      window.addthis.init();
      window.addthis.toolbox('.addthis_toolbox')    
      if(window.addthis.layers && window.addthis.layers.refresh) {
        window.addthis.layers.refresh();
      }    
      console.log("addthis Loaded");
    }

    
    render(){
        const {questionsList, showInstagramModal, activeItem, saveQuizProcessing, savedQuiz, quizKey} = this.state;

      const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

        return(
      
          <div className='container-fluid'>
             <Modal
        show={showInstagramModal}
        onHide={() => this.setState({showInstagramModal: false})}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize: 20, fontWeight: 'bold'}}>
          How to Add this link to your Instagram Bio.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{
            marginLeft: 24, marginTop: 24
          }}>
          <li>Copy your link</li>
          <li>Go on your profile in the app</li>
          <li>Click on Edit Profile</li>
          <li>Paste the link under Website section</li>
          </ul>
        </Modal.Body>
      </Modal>
              <LoadScript 
     url="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ea58ea57cc6edcd" 
    onLoad={this.handleScriptLoad}
    />    
            <div className='row'>
               <div className='col-1 col-sm-2 col-lg-2 '></div>
           <Box classes='col-10 col-sm-8 col-lg-8 box_container' style={{
             paddingBottom: 14
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
                        backgroundColor: colors.ThemeColor,
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

                  color: colors.ThemeColor,
                  fontSize: 24,
                  fontWeight: 'bold'
                }}>Your Quiz is Ready</p>
                <p style={{
                  color: '#4a4a4a',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>Share this link with your friends! They will try to guess the answers and will get a score out of 20</p>

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
                        backgroundColor: colors.ThemeColor,
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 16
                    }} onClick={this.copyToClipboard}>Copy This Link</button>
                  </OverlayTrigger>

              
                  <div className='row'>
                    <div className='col-sm-6'>
                    <a target='_blank'  
                    href={`whatsapp://send?text=%F0%9F%A4%97 *${this.props.main.name}* wants to know how well do you know him/her? %F0%9F%A4%97 %0A%F0%9F%8E%AF *Play His Friendship Quiz Now!* %F0%9F%A5%87%F0%9F%A5%88%F0%9F%A5%89 %0A%0A%0A%F0%9F%A4%AF%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%A4%AF%0A ${window.location.origin}/quiz/${quizKey.slice(1)}`} role="button" className="btn btn-block" style={{
                    backgroundColor: '#25d366',
                    color: 'white',
                    alignItems: 'center',
                    marginTop: 6,
                  }}>
                   <img src={require('../assets/img/whatsapp.svg')}
                  style={{width: 18, marginRight: 4,marginBottom: 2}} />
                   Share on Whatsapp</a>
                    </div>
                    <div className='col-sm-6'>
                    <button type="button" className="btn btn-block insta-button" style={{
                
                    color: 'white',
                    marginTop: 6
                  }} onClick={() => {
                    ReactGA.event({
                      category: 'Social Button Click',
                      action: 'Instagram Social Button Clicked',
                      value: this.state.activeItem
                    });
                    this.setState({showInstagramModal: true})}}>Add To Instagram Bio</button>
                    </div>
                  </div>
                  <div className="addthis_inline_share_toolbox"
                   style={{marginTop: 24}}
                  data-url={`${window.location.origin}/quiz/${quizKey.slice(1)}`} data-title={`${this.props.main.name} wants to know how well do you know him/her? Play His/Her Friendship Quiz Now!`}
                  >
                  </div>
                  <button type="button" className="btn btn-block" style={{
                    backgroundColor: colors.ThemeColor,
                    color: 'white',
                    marginTop: 12
                  }} onClick={() =>{
                    
                    
                    ReactGA.event({
                      category: 'Button Click',
                      action: 'Clicked on View Results',
                      value: this.state.activeItem
                    });
                    this.props.history.push(`/quiz/${quizKey.slice(1)}`)}}>
                      <span>{'\u{1F449}'}</span> View Results</button>
               
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
           <div className='col-1 col-sm-2 col-lg-2'></div>
           </div>
           </div>
        );
        
    }
}

const mapStateToProps = (state) => ({
  main: state.main
})

export default connect(mapStateToProps, {saveName})(Quiz)