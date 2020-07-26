import * as React from 'react';
import {QuestionArtist, AnswerArtist} from '../../types';

interface Props {
  onAnswer: (question: QuestionArtist, answer: AnswerArtist) => void;
  renderPlayer: (src: string, id: number) => React.ReactNode;
  question: QuestionArtist;
}

const QuestionArtistScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {onAnswer, question, renderPlayer} = props;
  const {answers, song} = question;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <div className="track">
        {renderPlayer(song.src, 0)}
      </div>
    </div>

    <form className="game__artist">
      {answers.map((answer, index) => {
        return <div className="artist" key={answer.artist}>
          <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${index}`} id={`answer-${index}`}
            onChange={(event) => {
              event.preventDefault();
              onAnswer(question, answer);
            }}
          />
          <label className="artist__name" htmlFor={`answer-${index}`}>
            <img className="artist__picture" src={answer.picture} alt={answer.artist} />
            {answer.artist}
          </label>
        </div>;
      })}
    </form>
  </section>;
};

export default QuestionArtistScreen;
