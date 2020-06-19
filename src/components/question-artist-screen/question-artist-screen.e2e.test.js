import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionArtistScreen from './question-artist-screen.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const QUESTION = {
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
};

describe(`QuestionArtistScreen e2e suite`, () => {
  it(`QuestionArtistScreen answer is sended`, () => {
    const onAnswerMock = jest.fn();

    const questionArtistScreen = shallow(
        <QuestionArtistScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
        />
    );

    const firstInputElement = questionArtistScreen.find(`input`).at(0);
    const preventDefaultMock = jest.fn();
    firstInputElement.simulate(`change`, {preventDefault: preventDefaultMock});

    expect(preventDefaultMock.mock.calls.length).toBe(1);
    expect(onAnswerMock.mock.calls.length).toBe(1);
  });

  it(`QuestionArtistScreen answer callback contains user answer`, () => {
    const expectedUserAnswer = QUESTION.answers[0];
    const onAnswerMock = jest.fn((...args) => [...args]);

    const questionArtistScreen = shallow(
        <QuestionArtistScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
        />
    );

    const firstInputElement = questionArtistScreen.find(`input`).at(0);
    const mockEvent = {preventDefault() {}};
    firstInputElement.simulate(`change`, mockEvent);

    expect(onAnswerMock).toHaveBeenCalledTimes(1);
    expect(onAnswerMock.mock.calls[0][0]).toMatchObject(QUESTION);
    expect(onAnswerMock.mock.calls[0][1]).toMatchObject(expectedUserAnswer);
  });
});
