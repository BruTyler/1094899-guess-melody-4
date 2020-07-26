import * as React from 'react';
import QuestionGenreItem from '../question-genre-item/question-genre-item';
import {QuestionGenre, RenderPlayerFunc} from '../../types';

interface Props {
  renderPlayer: RenderPlayerFunc,
  onAnswerChange: (index: number, value: boolean) => void,
  onAnswer: () => void,
  userAnswers: boolean[],
  question: QuestionGenre,
}

const QuestionGenreScreen: React.FunctionComponent<Props> = (props: Props) => {
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

export default QuestionGenreScreen;
