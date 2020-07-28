import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Link} from 'react-router-dom';

import Mistakes from '../mistakes/mistakes';
import {GameType, AppRoute, WelcomeScreenBehaviour} from '../../const';
import {getMistakes} from '../../reducer/game/selectors';
import {ActionCreator} from '../../reducer/game/game';

interface Props {
  gameType: GameType;
  children: React.ReactNode;
  goToWelcome: () => void;
  mistakes: number;
}

const GameScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {mistakes, gameType, children, goToWelcome} = props;

  return <section className={`game game--${gameType}`}>
    <header className="game__header">
      <Link
        className="game__back"
        to={AppRoute.ROOT}
        onClick={goToWelcome}
      >
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
      </Link>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370"
          style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
      </svg>

      <Mistakes
        count={mistakes}
      />
    </header>

    {children}
  </section>;
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToWelcome() {
    dispatch(ActionCreator.resetGame(WelcomeScreenBehaviour.SHOW));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
