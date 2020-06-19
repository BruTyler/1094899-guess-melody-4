import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionGenreScreen from './question-genre-screen.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

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

    const questionGenreScreen = shallow(
        <QuestionGenreScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
        />
    );

    const formElement = questionGenreScreen.find(`form.game__tracks`);
    const preventDefaultMock = jest.fn();
    formElement.simulate(`submit`, {preventDefault: preventDefaultMock});

    expect(preventDefaultMock.mock.calls.length).toBe(1);
    expect(onAnswerMock.mock.calls.length).toBe(1);
  });

  it(`QuestionGenreScreen answer callback contains user answers`, () => {
    const expectedUserAnswers = [false, true, false, false];
    const onAnswerMock = jest.fn((...args) => [...args]);

    const questionGenreScreen = shallow(
        <QuestionGenreScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
        />
    );

    const formElement = questionGenreScreen.find(`form.game__tracks`);

    const secondInput = questionGenreScreen.find(`input`).at(1);
    const checkedObject = {target: {checked: true}};
    secondInput.simulate(`change`, checkedObject);

    const preventDefaultMock = jest.fn();
    formElement.simulate(`submit`, {preventDefault: preventDefaultMock});
    expect(onAnswerMock).toHaveBeenCalledTimes(1);

    expect(onAnswerMock.mock.calls[0][0]).toMatchObject(QUESTION);
    expect(onAnswerMock.mock.calls[0][1]).toMatchObject(expectedUserAnswers);

    expect(
        questionGenreScreen.find(`input`).map((it) => it.prop(`checked`))
    ).toEqual(expectedUserAnswers);
  });
});
