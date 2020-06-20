import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import WelcomeScreen from './../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import {GameType} from "../../const.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      step: -1
    };
    
    this.handleWelcomeButtonClick = this.handleWelcomeButtonClick.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  handleWelcomeButtonClick() {
    this.setState({
      step: 0
    });
  }

  handleAnswerSubmit() {
    this.setState(
        (prevState) => ({
          step: prevState.step + 1
        })
    );
  }

  _renderGameScreen() {
    const {gameTime, errorCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return <WelcomeScreen
        time={gameTime}
        error={errorCount}
        onWelcomeButtonClick={this.handleWelcomeButtonClick}/>;
    }

    if (question) {
      switch (question.type) {
        case (GameType.ARTIST):
          return (
            <QuestionArtistScreen
              onAnswer={this.handleAnswerSubmit}
              question={question}
            />);
        case (GameType.GENRE):
          return (
            <QuestionGenreScreen
              onAnswer={this.handleAnswerSubmit}
              question={question}
            />);
        default:
          return ``;
      }
    }

    return ``;
  }

  render() {
    const {questions} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderGameScreen()}
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtistScreen
            onAnswer={() => {}}
            question={questions[1]}/>
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenreScreen
            onAnswer={() => {}}
            question={questions[0]} />
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
        genre: PropTypes.string,
        song: PropTypes.shape({
          artist: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
        }),
        answers: PropTypes.arrayOf(
            PropTypes.shape({
              picture: PropTypes.string,
              artist: PropTypes.string,
              src: PropTypes.string,
              genre: PropTypes.string,
            })
        ).isRequired
      })
  ).isRequired,
};

export default App;
