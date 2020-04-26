//import liraries
import React, { Component } from 'react';
import styles from '../../assets/styles/question.css'
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
      return( 

        <div 
        style={{backgroundColor: isRightOption ?'maroon' : (isClicked
         ===option.optionId  ? 'greenyellow' : '#fff') }}
        className='question-box'
        onClick={() => {
            const {optionId} = option;
            const {sendBackAnswer, activeQuestion, answer} = this.props;
            this.setState({isClicked: optionId})
            const {id} = activeQuestion;
          
            if(answer){


              let rightOptionFromProps = answer.answer
              if(option.optionId === rightOptionFromProps) sendBackAnswer(id, optionId, true);
              else {
                this.setState({rightOption: rightOptionFromProps}, () => setTimeout(() => 
                {
                  this.setState({rightOptionFromProps: null}, () => sendBackAnswer(id, optionId, false))
                }, 500))
              }
            }
           else {
              sendBackAnswer(id, optionId)
            }

        }}>
        <img style={{
            borderRadius: 15,
            marginTop: 14,
          width: this.state.width/5,
          height: (this.state.width/5 * 0.8),
        }} src={option.image} />
        <p style={{
              paddingBottom: 8,
              marginTop: 8,
              color: isRightOption ? 'white' : '#000'
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
