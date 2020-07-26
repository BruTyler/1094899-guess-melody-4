import * as React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

interface Props {
  onReplayButtonClick: () => void;
  mistakesCount: number;
  answeredQuestionsCount: number;
}

const GameWinScreen: React.FunctionComponent<Props> = ({onReplayButtonClick, mistakesCount, answeredQuestionsCount}: Props) => (
  <section className="result">
    <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">Вы ответили правильно на {answeredQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
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

export default GameWinScreen;
