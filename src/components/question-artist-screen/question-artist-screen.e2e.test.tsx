import * as React from 'react';
import {shallow} from 'enzyme';
import QuestionArtistScreen from './question-artist-screen';
import {QuestionArtist} from '../../types';
import {GameType} from '../../const';

const QUESTION: QuestionArtist = {
  type: GameType.ARTIST,
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
          renderPlayer={() => null}
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
    const onAnswerMock = jest.fn();

    const questionArtistScreen = shallow(
        <QuestionArtistScreen
          onAnswer={onAnswerMock}
          question={QUESTION}
          renderPlayer={() => null}
        />
    );

    const firstInputElement = questionArtistScreen.find(`input`).at(0);
    const preventDefaultMock = jest.fn();
    const mockEvent = {preventDefault: preventDefaultMock};
    firstInputElement.simulate(`change`, mockEvent);

    expect(onAnswerMock).toHaveBeenCalledTimes(1);
    expect(onAnswerMock.mock.calls[0][0]).toMatchObject(QUESTION);
    expect(onAnswerMock.mock.calls[0][1]).toMatchObject(expectedUserAnswer);
  });
});
