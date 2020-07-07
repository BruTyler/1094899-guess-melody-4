import {extend} from '../../utils.js';
import {GameType} from '../../const.js';

const initialState = {
  mistakes: 0,
  step: -1,
  maxMistakes: 3,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
};

const isArtistCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreCorrect = (question, userAnswer) => {
  const correctAnswers = question.answers.map((x) => x.genre === question.genre);
  return userAnswer.reduce((accumulatedResult, currentAnswer, index) =>
    accumulatedResult && currentAnswer === correctAnswers[index]);
};

const ActionCreator = {
  incrementStep: () => {
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };
  },

  incrementMistakes: (question, userAnswer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case (GameType.ARTIST):
        isAnswerCorrect = isArtistCorrect(question, userAnswer);
        break;
      case (GameType.GENRE):
        isAnswerCorrect = isGenreCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET_GAME,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend(initialState, {
        step: 0,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
