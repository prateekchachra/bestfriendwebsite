//import liraries
import React, { Component } from 'react';
import styles from '../../assets/styles/question.css'
class Question extends Component {


    constructor(props){
        super(props)
       this.state = { width: 0, height: 0, }
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


    renderOption = (option) => ( 

        <div 
        className='question-box'
        onClick={() => {
            const {optionId} = option;
            const {sendBackAnswer, activeQuestion} = this.props;
            const {id} = activeQuestion;
     
            sendBackAnswer(id, optionId)

        }}>
        <img style={{
            borderRadius: 15,
            marginTop: 14,
          width: this.state.width/5,
          height: 220
        }} src={option.image} />
        <p style={{
              paddingBottom: 8,
              marginTop: 8
        }}>{option.title}</p>

        </div>
   )

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
