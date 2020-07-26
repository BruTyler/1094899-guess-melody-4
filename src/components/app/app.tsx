import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GameType, AuthorizationStatus, AppRoute, WelcomeScreenBehaviour} from '../../const';
import PrivateRoute from '../private-route/private-route';
import GameScreen from './../game-screen/game-screen';
import WelcomeScreen from './../welcome-screen/welcome-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';
import GameOverScreen from '../game-over-screen/game-over-screen';
import GameWinScreen from '../game-win-screen/game-win-screen';
import {ActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes, getMaxMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import AuthorizationScreen from '../authorization-screen/authorization-screen';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import {Question} from '../../types';

interface Props {
  errorCount: number;
  questions: Question[];
  onUserAnswer: () => void;
  onWelcomeButtonClick: () => void;
  onLoginSubmit: () => void;
  onResetGame: () => void;
  step: number;
  currentGameMistakes: number;
  authorizationStatus: string;
  handleLoadQuestions: () => void;
  handleCheckAuthorization: () => void;
}

const QuestionGenreScreenWrapped = withActivePlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withActivePlayer(QuestionArtistScreen);

class App extends React.PureComponent<Props> {
  constructor(props: Readonly<Props>) {
    super(props);

    this._init();
  }

  _init() {
    const {handleLoadQuestions, handleCheckAuthorization} = this.props;
    handleLoadQuestions();
    handleCheckAuthorization();
  }

  _renderGameScreen() {
    const {
      errorCount,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
      currentGameMistakes,
      authorizationStatus,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return <WelcomeScreen
        error={errorCount}
        onWelcomeButtonClick={onWelcomeButtonClick}/>;
    } else if (currentGameMistakes >= errorCount) {
      return <Redirect to={AppRoute.GAME_OVER} />;
    } else if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return <Redirect to={AppRoute.AUTH} />;
      } else if (authorizationStatus === AuthorizationStatus.AUTH) {
        return <Redirect to={AppRoute.GAME_WIN} />;
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
    const {
      step,
      currentGameMistakes,
      onResetGame,
      onLoginSubmit,
    } = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {this._renderGameScreen()}
        </Route>
        <Route exact path={AppRoute.AUTH}>
          <AuthorizationScreen
            onLoginSubmit={onLoginSubmit}
            onReplayButtonClick={onResetGame}
          />
        </Route>
        <Route exact path={AppRoute.GAME_OVER}>
          <GameOverScreen
            onReplayButtonClick={onResetGame}
          />
        </Route>
        <PrivateRoute exact path={AppRoute.GAME_WIN}
          render={() => {
            return <GameWinScreen
              onReplayButtonClick={onResetGame}
              mistakesCount={currentGameMistakes}
              answeredQuestionsCount={step}
            />;
          }}
        />
        <Route render={() => `Ooops`} />
      </Switch>
    </BrowserRouter>;
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  questions: getQuestions(state),
  step: getStep(state),
  errorCount: getMaxMistakes(state),
  currentGameMistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, userAnswer) {
    dispatch(ActionCreator.incrementMistakes(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },
  onResetGame() {
    dispatch(ActionCreator.resetGame(WelcomeScreenBehaviour.HIDE));
  },
  onLoginSubmit(authData) {
    dispatch(UserOperation.makeAuthorization(authData));
  },
  handleLoadQuestions() {
    dispatch(DataOperation.loadQuestions());
  },
  handleCheckAuthorization() {
    dispatch(UserOperation.checkAuthorization());
  },
});

export {App as RawComponent};
export default connect(mapStateToProps, mapDispatchToProps)(App);
