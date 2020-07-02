import React from 'react';
import renderer from 'react-test-renderer';
import QuestionGenreScreen from './question-genre-screen.jsx';

const EMPTY_HANDLER = () => {};
const USER_ANSWERS = [false, false, false, false];
const QUESTION = {
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
