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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;

      /* if (nextStep >= state.questionCount) {
        return extend({}, initialState);
      } */

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      /*
      if (mistakes >= state.maxMistakes) {
        return extend({}, initialState);
      }
      */

      return extend(state, {
        mistakes,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
