import {reducer, ActionType, ActionCreator} from './game.js';
import {GameType, WelcomeScreenBehaviour} from '../../const.js';

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

describe(`Game reducer unit-tests`, () => {
  it(`Game reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should increment step by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 2
    })
    ).toEqual({
      step: 1,
      mistakes: 0,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should increment step by a value and should not reset the game`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    }, {
      type: ActionType.INCREMENT_STEP,
      payload: 100
    })
    ).toEqual({
      step: 99,
      mistakes: 0,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should increment mistakes by a value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    }, {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    })
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should increment mistakes in genre- game using action`, () => {
    const genreQuestion = QUESTIONS.find((x) => x.type === GameType.GENRE);
    const incorrectAnswers = genreQuestion.answers.map((x) => x.genre !== genreQuestion.genre);

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    }, ActionCreator.incrementMistakes(genreQuestion, incorrectAnswers))
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
    });
  });

  it(`Reducer should increment mistakes in artist- game using action`, () => {
    const artistQuestion = QUESTIONS.find((x) => x.type === GameType.ARTIST);
    const incorrectAnswer = {artist: `incorrectArtist`};

    expect(reducer({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    }, ActionCreator.incrementMistakes(artistQuestion, incorrectAnswer))
    ).toEqual({
      step: -1,
      mistakes: 1,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should reset the game and skip WelcomeScreen using action`, () => {
    expect(reducer({
      step: 3,
      mistakes: 3,
      maxMistakes: 3,
    }, ActionCreator.resetGame(WelcomeScreenBehaviour.HIDE))
    ).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should reset the game and show WelcomeScreen using action`, () => {
    expect(reducer({
      step: 3,
      mistakes: 3,
      maxMistakes: 3,
    }, ActionCreator.resetGame(WelcomeScreenBehaviour.SHOW))
    ).toEqual({
      step: -1,
      mistakes: 0,
      maxMistakes: 3,
    });
  });

  it(`Game reducer should reset the game using object`, () => {
    expect(reducer({
      step: 3,
      mistakes: 3,
      maxMistakes: 3,
    }, {
      type: ActionType.RESET_GAME,
      payload: 0,
    })
    ).toEqual({
      step: 0,
      mistakes: 0,
      maxMistakes: 3,
    });
  });
});
