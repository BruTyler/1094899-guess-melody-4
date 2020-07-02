import React from 'react';
import {shallow} from 'enzyme';
import withUserAnswer from "./with-user-answer.jsx";

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

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

describe(`withUserAnswer e2e suite`, () => {
  it(`withUserAnswer user-answer is changed correctly`, () => {
    const onAnswerMock = jest.fn();

    const shallowScreen = shallow(
        <MockComponentWrapped
          onAnswer={onAnswerMock}
          question={QUESTION}
        />
    );

    expect(shallowScreen.props().userAnswers).toEqual([false, false, false, false]);

    shallowScreen.props().onAnswerChange(1, true);
    expect(shallowScreen.props().userAnswers).toEqual([false, true, false, false]);

    shallowScreen.props().onAnswerChange(3, true);
    expect(shallowScreen.props().userAnswers).toEqual([false, true, false, true]);
  });
});
