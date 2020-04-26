//import liraries
import React, { Component } from 'react';
import Box from '../components/main/Box';
import { questions } from '../assets/questions';
import Firebase from '../utils/firebaseConfig';
// create a component
class QuizResult extends Component {


    constructor(props){
        super(props)
        if(props.location.state){

        const { score } = props.location.state

        this.state = {score}
        }
        else {

        this.state = {score: null}
        }
    }


    componentWillMount() {
        const {score} = this.state;
        if(!score){
            const {match: {params}, history} = this.props;
            const quizRef = Firebase.database().ref(`/quizzes/-${params.quizId}`)
            quizRef.once('value').then(snapshot => {
               let data = snapshot.val() ? snapshot.val() : null;
            
               if(data === null){
                history.push('/')
              }
              else {
                  const { scores } = data;
                let scoreObj = scores.filter(score => score.name === params.name)[0];
                if(!scoreObj){
                    history.push('/')
                }
                else {
                    this.setState({score: scoreObj})
                }
              }
            })    
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    goToQuiz = () => {
        const {match: {params}, history} = this.props;

        history.push(`/quiz/${params.quizId}/`)
    }
    render() {
        const {score} = this.state;

        return (
            <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
               {score ?  
               <>
               <div className='text-center'>
                <p className='text-center' style={{fontSize: 24, fontWeight: 'bold'}}>
                   {score.name} 
                </p>

                <button type="button" className="btn btn-center"
                    
                    style={{
                        backgroundColor: 'maroon',
                        color: 'white',
                        textAlign: 'center'
                    }} onClick={this.goToQuiz}>Go Back</button>
                </div>
                    <table className='table table-striped table-bordered' style={{marginTop: 24}}>
                    <tbody>
                {score.answers.map((item, index) => {
                    

                    let activeQuestion = questions[item.question - 1];
                    let answer = ''
                    let answerObj = activeQuestion.options.filter(option => option.optionId == item.answer)[0]
                    answer = answerObj ? answerObj.title : '';

                    return(
                    <>
                    <tr>
                        <th>
                            {activeQuestion.title}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            {answer}
                        </td>
                    </tr>
                    </>
                )})}
                </tbody>
                </table>
                </>
                : null}
            </div>  
                </div>
           </div>
        );
    }
}

//make this component available to the app
export default QuizResult;
