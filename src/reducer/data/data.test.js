import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './data.js';

const api = createAPI(() => {});

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

describe(`Data reducer unit-test`, () => {
  it(`Data reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      questions: [],
    });
  });

  it(`Data reducer should update questions by load questions`, () => {
    expect(reducer({
      questions: [],
    }, {
      type: ActionType.LOAD_QUESTIONS,
      payload: QUESTIONS,
    })).toEqual({
      questions: QUESTIONS,
    });
  });

  it(`Data reducer should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
