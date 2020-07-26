import React from 'react';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

const GameWinScreen = ({onReplayButtonClick, mistakesCount, answeredQuestionsCount}) => (
  <section className="result">
    <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">Вы ответили правильно на {answeredQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
    <Link
      className="replay"
      type="button"
      to={AppRoute.ROOT}
      onClick={onReplayButtonClick}
    >
      Сыграть ещё раз
    </Link>
  </section>
);

GameWinScreen.propTypes = {
  onReplayButtonClick: PropTypes.func.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  answeredQuestionsCount: PropTypes.number.isRequired,
};

export default GameWinScreen;
