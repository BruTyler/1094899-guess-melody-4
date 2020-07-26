import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Mistakes from '../mistakes/mistakes.js';
import {GameType, AppRoute, WelcomeScreenBehaviour} from '../../const.js';
import {getMistakes} from '../../reducer/game/selectors.js';
import {ActionCreator} from '../../reducer/game/game.js';

const GameScreen = ({mistakes, gameType, children, goToWelcome}) => {
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

GameScreen.propTypes = {
  mistakes: PropTypes.number.isRequired,
  gameType: PropTypes.oneOf(Object.values(GameType)).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  goToWelcome: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  goToWelcome() {
    dispatch(ActionCreator.resetGame(WelcomeScreenBehaviour.SHOW));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
