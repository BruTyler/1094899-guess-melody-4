import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../const.js';
import QuestionGenreItem from '../question-genre-item/question-genre-item.jsx';

const QuestionGenreScreen = (props) => {
  const {onAnswer, question, renderPlayer, onAnswerChange, userAnswers} = props;
  const {genre, answers} = question;

  return <section className="game__screen">
    <h2 className="game__title">Выберите {genre} треки</h2>
    <form className="game__tracks"
      onSubmit={(event) => {
        event.preventDefault();
        onAnswer();
      }}
    >
      {answers.map((answer, index) =>
        <QuestionGenreItem
          key={`${index}-${answer.src}`}
          index={index}
          isChecked={userAnswers[index]}
          answerSrc={answer.src}
          renderPlayer={renderPlayer}
          onAnswerChange={onAnswerChange}
        />
      )}

      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  </section>;
};

QuestionGenreScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          genre: PropTypes.string.isRequired,
          src: PropTypes.string.isRequired,
        })
    ).isRequired
  }).isRequired,
};

export default QuestionGenreScreen;
