import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GameType} from "../../const.js";
import AudioPlayer from '../audio-player/audio-player.jsx';
class QuestionGenreScreen extends PureComponent {
  state = {
    answers: [false, false, false, false],
    activePlayerId: 0
  };

  render() {
    const {onAnswer, question} = this.props;
    const {answers: userAnswers, activePlayerId} = this.state;
    const {genre, answers} = question;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks"
        onSubmit={(event) => {
          event.preventDefault();
          onAnswer(question, this.state.answers);
        }}
      >
        {answers.map((answer, index) => (
          <div className="track" key={`${index}-${answer.src}`}>
            <AudioPlayer
              onPlayButtonClick={() => {
                this.setState({
                  activePlayerId: activePlayerId === index ? -1 : index,
                });
              }}
              isPlaying={index === activePlayerId}
              src={answer.src}
            />
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`}
                checked={userAnswers[index]}
                onChange={(event) => {
                  const value = event.target.checked;
                  this.setState({
                    answers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)]
                  });
                }}
              />
              <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
            </div>
          </div>
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }

}

QuestionGenreScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
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
