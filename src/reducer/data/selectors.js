import {createSelector} from 'reselect';
import NameSpace from '../name-space.js';
import {GameType} from '../../const.js';


const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === GameType.ARTIST);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === GameType.GENRE);
    }
);
