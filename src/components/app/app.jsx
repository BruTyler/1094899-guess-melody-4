import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {GameType, AuthorizationStatus} from '../../const.js';
import GameScreen from './../game-screen/game-screen.jsx';
import WelcomeScreen from './../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player.jsx';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import GameWinScreen from '../game-win-screen/game-win-screen.jsx';
import {ActionCreator} from '../../reducer/game/game.js';
import {getStep, getMistakes, getMaxMistakes} from '../../reducer/game/selectors.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import AuthorizationScreen from '../authorization-screen/authorization-screen.jsx';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as UserOperation} from "../../reducer/user/user.js";

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      errorCount,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
      currentGameMistakes,
      onResetGame,
      authorizationStatus,
      onLoginSubmit,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return <WelcomeScreen
        error={errorCount}
        onWelcomeButtonClick={onWelcomeButtonClick}/>;
    } else if (currentGameMistakes >= errorCount) {
      return <GameOverScreen
        onReplayButtonClick={onResetGame}/>;
    } else if (step >= questions.length) {

      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return <AuthorizationScreen
          onLoginSubmit={onLoginSubmit}
          onReplayButtonClick={onResetGame}
        />;
      } else if (authorizationStatus === AuthorizationStatus.AUTH) {
        const correctAnswersCount = step - currentGameMistakes;
        return <GameWinScreen
          onReplayButtonClick={onResetGame}
          mistakesCount={currentGameMistakes}
          answeredQuestionsCount={correctAnswersCount}
        />;
      }

    }

    if (question) {
      switch (question.type) {
        case (GameType.ARTIST):
          return (
            <GameScreen gameType={question.type}>
              <QuestionArtistScreenWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
        case (GameType.GENRE):
          return (
            <GameScreen gameType={question.type}>
              <QuestionGenreScreenWrapped
                onAnswer={onUserAnswer}
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
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderGameScreen()}
        </Route>
        <Route exact path="/dev-auth">
          <AuthorizationScreen
            onLoginSubmit={() => {}}
            onReplayButtonClick={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onResetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  currentGameMistakes: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  questions: getQuestions(state),
  step: getStep(state),
  errorCount: getMaxMistakes(state),
  currentGameMistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, userAnswer) {
    dispatch(ActionCreator.incrementMistakes(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },
  onResetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onLoginSubmit(authData) {
    dispatch(UserOperation.makeAuthorization(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
