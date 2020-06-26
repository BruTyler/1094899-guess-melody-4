import {reducer, ActionType} from "./reducer.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should increment step by a value`, () => {
  expect(reducer(
      {
        step: -1,
        mistakes: 0,
      }, {
        type: ActionType.INCREMENT_STEP,
        payload: 2
      })
  ).toEqual({
    step: 1,
    mistakes: 0,
  });

  expect(reducer(
      {
        step: -1,
        mistakes: 0,
      }, {
        type: ActionType.INCREMENT_STEP,
        payload: 100
      })
  ).toEqual({
    step: 99,
    mistakes: 0,
  });
});

it(`Reducer should increment mistakes by a value`, () => {
  expect(reducer(
      {
        step: -1,
        mistakes: 0,
      }, {
        type: ActionType.INCREMENT_MISTAKES,
        payload: 1
      })
  ).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer(
      {
        step: -1,
        mistakes: 0,
      }, {
        type: ActionType.INCREMENT_MISTAKES,
        payload: 100
      })
  ).toEqual({
    step: -1,
    mistakes: 100,
  });
});
