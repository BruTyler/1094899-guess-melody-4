import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const EMPTY_HANDLER = () => {};
const TIME = 100;
const ERROR = 2;
const QUESTIONS = [
  {
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
  }, {
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
  }
];

describe(`App render suit`, () => {
  it(`App renders WelcomeScreen`, () => {
    const generatedTree = renderer.create(
        <App
          gameTime={TIME}
          errorCount={ERROR}
          questions={QUESTIONS}
          onUserAnswer={EMPTY_HANDLER}
          onWelcomeButtonClick={EMPTY_HANDLER}
          step={-1}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders GenreScreen`, () => {
    const questionIndex = QUESTIONS.findIndex((x) => x.type === `genre`);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <App
          gameTime={TIME}
          errorCount={ERROR}
          questions={QUESTIONS}
          onUserAnswer={EMPTY_HANDLER}
          onWelcomeButtonClick={EMPTY_HANDLER}
          step={questionIndex}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders ArtistScreen`, () => {
    const questionIndex = QUESTIONS.findIndex((x) => x.type === `artist`);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <App
          gameTime={TIME}
          errorCount={ERROR}
          questions={QUESTIONS}
          onUserAnswer={EMPTY_HANDLER}
          onWelcomeButtonClick={EMPTY_HANDLER}
          step={questionIndex}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
