import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';

const mockStore = configureStore();

const EMPTY_HANDLER = () => {};
const TIME = 100;
const ERRORS = 3;
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
    const store = mockStore({
      mistakes: 0,
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App
            gameTime={TIME}
            errorCount={ERRORS}
            questions={QUESTIONS}
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            step={-1}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders GenreScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const questionIndex = QUESTIONS.findIndex((x) => x.type === `genre`);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App
            gameTime={TIME}
            errorCount={ERRORS}
            questions={QUESTIONS}
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            step={questionIndex}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders ArtistScreen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const questionIndex = QUESTIONS.findIndex((x) => x.type === `artist`);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App
            gameTime={TIME}
            errorCount={ERRORS}
            questions={QUESTIONS}
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            step={questionIndex}
          />
        </Provider>
        , {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
