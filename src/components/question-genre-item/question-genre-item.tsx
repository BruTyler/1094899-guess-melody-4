import * as React from 'react';
import { RenderPlayerFunc } from '../../types';

interface Props {
  renderPlayer: RenderPlayerFunc,
  onAnswerChange: (index: number, value: boolean) => void,
  isChecked: boolean,
  index: number,
  answerSrc: string,
}

const QuestionGenreItem: React.FunctionComponent<Props> = (props: Props) => {
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

export default QuestionGenreItem;
