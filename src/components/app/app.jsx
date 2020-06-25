import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {GameType} from "../../const.js";
import GameScreen from './../game-screen/game-screen.jsx';
import WelcomeScreen from './../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import withActivePlayer from '../../hocs/with-audio-player/with-audio-player.jsx';

const QuestionGenreScreenWrapped = withActivePlayer(QuestionGenreScreen);
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

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
            <GameScreen gameType={question.type}>
              <QuestionArtistScreenWrapped
                onAnswer={this.handleAnswerSubmit}
                question={question}
              />
            </GameScreen>
          );
        case (GameType.GENRE):
          return (
            <GameScreen gameType={question.type}>
              <QuestionGenreScreenWrapped
                onAnswer={this.handleAnswerSubmit}
                question={question}
              />
            </GameScreen>);
        default:
          return null;
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderGameScreen()}
        </Route>
        <Route exact path="/dev-artist">
          <GameScreen gameType={GameType.ARTIST}>
            <QuestionArtistScreenWrapped
              onAnswer={() => {}}
              question={questions[1]}/>
          </GameScreen>;
        </Route>
        <Route exact path="/dev-genre">
          <GameScreen gameType={GameType.GENRE}>
            <QuestionGenreScreenWrapped
              onAnswer={() => {}}
              question={questions[0]}/>
          </GameScreen>;
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default App;
