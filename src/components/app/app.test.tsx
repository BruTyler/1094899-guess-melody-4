import * as React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import * as App from './app';
import NameSpace from '../../reducer/name-space';
import {AuthorizationStatus, GameType} from '../../const';
import {createAPI} from '../../api';

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

apiMock
  .onAny()
  .reply(200, []);
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const EMPTY_HANDLER = () => {};
const MAX_ERRORS = 3;
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
  it(`App connected with Store renders WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        step: -1,
        mistakes: 0,
        maxMistakes: MAX_ERRORS,
      },
      [NameSpace.DATA]: {
        questions: [],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            onResetGame={EMPTY_HANDLER}
            onLoginSubmit={EMPTY_HANDLER}
            handleLoadQuestions={EMPTY_HANDLER}
            handleCheckAuthorization={EMPTY_HANDLER}
          />
        </Provider>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders WelcomeScreen`, () => {
    const generatedTree = renderer.create(
        <App.RawComponent
          errorCount={MAX_ERRORS}
          questions={QUESTIONS}
          onUserAnswer={EMPTY_HANDLER}
          onWelcomeButtonClick={EMPTY_HANDLER}
          step={-1}
          onResetGame={EMPTY_HANDLER}
          onLoginSubmit={EMPTY_HANDLER}
          currentGameMistakes={0}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          handleLoadQuestions={EMPTY_HANDLER}
          handleCheckAuthorization={EMPTY_HANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });

  it(`App renders GenreScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: MAX_ERRORS,
      },
    });

    const questionIndex = QUESTIONS.findIndex((x) => x.type === GameType.GENRE);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App.RawComponent
            errorCount={MAX_ERRORS}
            questions={QUESTIONS}
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            step={questionIndex}
            onResetGame={EMPTY_HANDLER}
            onLoginSubmit={EMPTY_HANDLER}
            currentGameMistakes={0}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            handleLoadQuestions={EMPTY_HANDLER}
            handleCheckAuthorization={EMPTY_HANDLER}
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
      [NameSpace.GAME]: {
        mistakes: MAX_ERRORS,
      },
    });

    const questionIndex = QUESTIONS.findIndex((x) => x.type === GameType.ARTIST);
    expect(questionIndex).not.toBe(-1);

    const generatedTree = renderer.create(
        <Provider store={store}>
          <App.RawComponent
            errorCount={MAX_ERRORS}
            questions={QUESTIONS}
            onUserAnswer={EMPTY_HANDLER}
            onWelcomeButtonClick={EMPTY_HANDLER}
            step={questionIndex}
            onResetGame={EMPTY_HANDLER}
            currentGameMistakes={0}
            onLoginSubmit={EMPTY_HANDLER}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            handleLoadQuestions={EMPTY_HANDLER}
            handleCheckAuthorization={EMPTY_HANDLER}
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
