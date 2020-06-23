import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from "../../const.js";
import AudioPlayer from '../audio-player/audio-player.jsx';

const QuestionArtistScreen = (props) => {
  const {onAnswer, question} = props;
  const {answers, song} = question;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <div className="track">
        <AudioPlayer
          src={song.src}
          isPlaying={true}
          onPlayButtonClick={() => {}}
        />
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

QuestionArtistScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string.isRequired,
          artist: PropTypes.string.isRequired,
        })
    ).isRequired
  }).isRequired,
};

export default QuestionArtistScreen;
