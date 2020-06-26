import {extend} from './utils.js';
import questions from './mocks/questions.js';
import settings from './mocks/settings.js';
import {GameType} from './const.js';

const initialState = {
  mistakes: 0,
  step: -1,
  maxMistakes: settings.errorCount,
  questionCount: questions.length,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
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
        isAnswerCorrect = userAnswer.artist === question.song.artist;
        break;
      case (GameType.GENRE):
        const correctAnswers = question.answers.map((x) => x.genre === question.genre);
        isAnswerCorrect = userAnswer.reduce((accumulatedResult, currentAnswer, index) => accumulatedResult && currentAnswer === correctAnswers[index]);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1
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
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
