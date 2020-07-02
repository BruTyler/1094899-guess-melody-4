import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import {GameType} from "../../const.js";
import GameScreen from './../game-screen/game-screen.jsx';
import WelcomeScreen from './../welcome-screen/welcome-screen.jsx';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen.jsx';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player.jsx';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer.jsx';

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      gameTime,
      errorCount,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return <WelcomeScreen
        time={gameTime}
        error={errorCount}
        onWelcomeButtonClick={onWelcomeButtonClick}/>;
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
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, userAnswer) {
    dispatch(ActionCreator.incrementMistakes(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
