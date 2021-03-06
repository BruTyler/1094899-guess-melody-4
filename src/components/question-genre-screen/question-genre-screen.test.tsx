import * as React from 'react';
import * as renderer from 'react-test-renderer';
import QuestionGenreScreen from './question-genre-screen';
import {GameType} from '../../const';
import {QuestionGenre} from '../../types';

const EMPTY_HANDLER = () => null;
const USER_ANSWERS = [false, false, false, false];
const QUESTION: QuestionGenre = {
  type: GameType.GENRE,
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
};

describe(`QuestionGenreScreen render suit`, () => {
  it(`QuestionGenreScreen render case`, () => {
    const generatedTree = renderer.create(
        <QuestionGenreScreen
          onAnswer={EMPTY_HANDLER}
          renderPlayer={EMPTY_HANDLER}
          question={QUESTION}
          onAnswerChange={EMPTY_HANDLER}
          userAnswers={USER_ANSWERS}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
