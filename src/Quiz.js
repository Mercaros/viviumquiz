import React, {Component} from 'react';
import {QuizData} from './QuizData';
import './Quiz.css';

class Quiz extends Component {

    state = {
        userAnswer: null,
        currentQuestion: 0,
        score: 0,
        options: [],
        quizEnd: false,
        disabled: true,
    };

    loadQuizData = () => {
        this.setState(() => {
            return {
                questions: QuizData[this.state.currentQuestion].question,
                answer: QuizData[this.state.currentQuestion].answer,
                options: QuizData[this.state.currentQuestion].options
            };
        });
    };

    componentDidMount() {
        this.loadQuizData();
    }

    nextQuestionHandler = () => {
        const {userAnswer, answer, score} = this.state;
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
        console.log(this.state.currentQuestion);
        if (userAnswer === answer) {
            this.setState({
                score: score + 1
            })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    questions: QuizData[this.state.currentQuestion].question,
                    answer: QuizData[this.state.currentQuestion].answer,
                    options: QuizData[this.state.currentQuestion].options
                };
            });
        }
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        });
    };

    finishHandler = () => {
        if (this.state.currentQuestion === QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
    };

    render() {
        const {questions, options, userAnswer, quizEnd, score} = this.state;

        if (quizEnd) {
            return (
                <div>
                    <h2>Game Over</h2>
                    <h3>Je totaal aantal punten zijn: {score}</h3>
                </div>
            )
        }
        return (
            <div>
                <span>{`Questions ${this.state.currentQuestion} out of ${QuizData.length - 1} remaining `}</span>
                <h2> {questions} </h2>
                <div className="container">

                    {options.map(option => (
                        <div className="col mt-4">
                            <button key={option.id}
                                    className={`btn btn-warning btn-lg ${userAnswer === option ? "selected" : null}`}
                                    onClick={() => this.checkAnswer(option)}>
                                {option}</button>

                        </div>
                    ))}
                </div>

                {this.state.currentQuestion < QuizData.length - 1 && (
                    <button disabled={this.state.disabled} onClick={this.nextQuestionHandler} type="button"
                            className="btn btn-success btn-lg mt-4">Next</button>
                )}

                {this.state.currentQuestion === QuizData.length - 1 && (
                    <button disabled={this.state.disabled} onClick={this.finishHandler} type="button"
                            className="btn btn-success btn-lg mt-4">Finish</button>)}
            </div>
        )
    }
}

export default Quiz;