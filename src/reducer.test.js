import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {GameType} from './const.js';

const QUESTIONS = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `url/rock`,
      genre: `rock`,
    }, {
      src: `url/blues`,
      genre: `blues`,
    }, {
      src: `url/jazz`,
      genre: `jazz`,
    }, {
      src: `url/rock`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `src/url`,
    },
    answers: [{
      picture: `picture/url/1`,
      artist: `John Snow`,
    }, {
      picture: `picture/url/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `picture/url/3`,
      artist: `Jim Beam`,
    }],
  }
];

describe(`Reducer unit- suit`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should increment step by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: 100,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 2
    })
    ).toEqual({
      step: 1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: 100,
    });
  });

  it(`Reducer should reset the game due the overflow of increment step by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 100
    })
    ).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should increment mistakes by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    })
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should reset the game due the overflow of increment mistakes by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 100
    })
    ).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should increment mistakes in genre- game using action`, () => {
    const genreQuestion = QUESTIONS.find((x) => x.type === GameType.GENRE);
    const incorrectAnswers = genreQuestion.answers.map((x) => x.genre !== genreQuestion.genre);

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, ActionCreator.incrementMistakes(genreQuestion, incorrectAnswers))
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should NOT increment mistakes in genre- game using action`, () => {
    const genreQuestion = QUESTIONS.find((x) => x.type === GameType.GENRE);
    const correctAnswers = genreQuestion.answers.map((x) => x.genre === genreQuestion.genre);

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, ActionCreator.incrementMistakes(genreQuestion, correctAnswers))
    ).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should increment mistakes in artist- game using action`, () => {
    const artistQuestion = QUESTIONS.find((x) => x.type === GameType.ARTIST);
    const incorrectAnswer = {artist: `incorrectArtist`};

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, ActionCreator.incrementMistakes(artistQuestion, incorrectAnswer))
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });

  it(`Reducer should NOT increment mistakes in artist- game using action`, () => {
    const artistQuestion = QUESTIONS.find((x) => x.type === GameType.ARTIST);
    const correctAnswer = {artist: artistQuestion.song.artist};

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    }, ActionCreator.incrementMistakes(artistQuestion, correctAnswer))
    ).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
      questionCount: QUESTIONS.length,
    });
  });
});