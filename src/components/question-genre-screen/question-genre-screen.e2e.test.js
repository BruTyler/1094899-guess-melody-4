import React from 'react';
import {mount} from 'enzyme';
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

describe(`QuestionGenreScreen e2e suite`, () => {
  it(`QuestionGenreScreen answer is sended`, () => {
    const onAnswerMock = jest.fn();

    const questionGenreScreen = mount(
        <QuestionGenreScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
          renderPlayer={EMPTY_HANDLER}
          onAnswerChange={EMPTY_HANDLER}
          userAnswers={USER_ANSWERS}
        />
    );

    const formElement = questionGenreScreen.find(`form.game__tracks`);
    const preventDefaultMock = jest.fn();
    formElement.simulate(`submit`, {preventDefault: preventDefaultMock});

    expect(preventDefaultMock.mock.calls.length).toBe(1);
    expect(onAnswerMock.mock.calls.length).toBe(1);
  });

  it(`QuestionGenreScreen answer- callback doesn't contain user- answers`, () => {
    const onAnswerMock = jest.fn();

    const questionGenreScreen = mount(
        <QuestionGenreScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
          renderPlayer={EMPTY_HANDLER}
          onAnswerChange={EMPTY_HANDLER}
          userAnswers={USER_ANSWERS}
        />
    );

    expect(questionGenreScreen.find(`input`).map((it) => it.prop(`checked`)))
      .toEqual(USER_ANSWERS);

    const formElement = questionGenreScreen.find(`form.game__tracks`);
    const preventDefaultMock = jest.fn();
    formElement.simulate(`submit`, {preventDefault: preventDefaultMock});

    expect(onAnswerMock).toHaveBeenCalledTimes(1);
    expect(onAnswerMock.mock.calls[0][0]).toEqual(void 0);
  });

  it(`QuestionGenreScreen answer-change callback contains new answer- value`, () => {
    const onAnswerChangeMock = jest.fn();

    const questionGenreScreen = mount(
        <QuestionGenreScreen
          onAnswer={EMPTY_HANDLER}
          question={QUESTION}
          renderPlayer={EMPTY_HANDLER}
          onAnswerChange={onAnswerChangeMock}
          userAnswers={USER_ANSWERS}
        />
    );

    const changedIndex = 1;
    const secondInput = questionGenreScreen.find(`input`).at(changedIndex);
    const checkedObject = {target: {checked: true}};
    secondInput.simulate(`change`, checkedObject);

    expect(onAnswerChangeMock).toHaveBeenCalledTimes(1);
    expect(onAnswerChangeMock.mock.calls[0][0]).toEqual(changedIndex);
    expect(onAnswerChangeMock.mock.calls[0][1]).toEqual(true);
  });
});
