//import liraries
import React, { Component } from 'react';
import UIfx from 'uifx'
import styles from '../../assets/styles/question.css'
import wrong from '../../assets/sounds/wrong.mp3'
import right from '../../assets/sounds/right.mp3'

const wrongSound = new UIfx(wrong)
const rightSound = new UIfx(right)



class Question extends Component {


    constructor(props){
        super(props)
       this.state = { width: 0, height: 0,isClicked: null }
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


      componentWillReceiveProps(nextProps) {
        if(nextProps.activeQuestion !== this.props.activeQuestion){
          this.setState({isClicked: null, rightOption: null,})
        }
      }
    renderOption = (option) => {
      
      const {rightOption, isClicked} = this.state;
      
      const isRightOption = rightOption && rightOption === option.optionId

      let effectiveBackgroundColor = '#fff';

      let isWhiteBackground = false;
      if(rightOption){
        if(isRightOption) 
        effectiveBackgroundColor = 'greenyellow'

        else if(isClicked === option.optionId && !isRightOption) {
          isWhiteBackground= true;
          effectiveBackgroundColor = 'maroon'
        }
      }
      else {
        if(isClicked === option.optionId){
          effectiveBackgroundColor = 'greenyellow'
        }
      }
      return( 

        <div 
        style={{backgroundColor: effectiveBackgroundColor }}
        className='question-box'
        onClick={() => {
            const {optionId} = option;
            const {sendBackAnswer, activeQuestion, answer} = this.props;
            this.setState({isClicked: optionId})
            const {id} = activeQuestion;

          
            if(answer){


              let rightOptionFromProps = answer.answer
              if(option.optionId === rightOptionFromProps) {
                rightSound.play()
               setTimeout(() => sendBackAnswer(id, optionId, true), 200) 
              
              }
              else {
                wrongSound.play()
                this.setState({rightOption: rightOptionFromProps}, () => setTimeout(() => 
                {
                  this.setState({rightOption: null}, () => sendBackAnswer(id, optionId, false))
                }, 500))
              }
            }
           else {
            setTimeout(() => sendBackAnswer(id, optionId), 200) 
            }

        }}>
        <img  
        className='img-fluid'
        style={{
            borderRadius: 15,
            marginTop: 14,
          width: this.state.width/5,
          height: (this.state.width/5 * 0.8),
        }} src={option.image} />
        <p style={{
              paddingBottom: 8,
              marginTop: 8,
              width: this.state.width/5,
              color: isWhiteBackground ? 'white' : '#000'
        }}>{option.title}</p>

        </div>
   );}

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
