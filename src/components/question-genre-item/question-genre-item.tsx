import React from 'react';
import PropTypes from 'prop-types';

const QuestionGenreItem = (props) => {
  const {index, isChecked, answerSrc, renderPlayer, onAnswerChange} = props;

  return <div className="track">
    {renderPlayer(answerSrc, index)}
    <div className="game__answer">
      <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`}
        checked={isChecked}
        onChange={(event) => {
          const value = event.target.checked;
          onAnswerChange(index, value);
        }}
      />
      <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
    </div>
  </div>;
};

QuestionGenreItem.propTypes = {
  renderPlayer: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  answerSrc: PropTypes.string.isRequired,
};

export default QuestionGenreItem;
