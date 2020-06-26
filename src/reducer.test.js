import {reducer, ActionType, ActionCreator} from "./reducer.js";

describe(`Reducer unit- test suit`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Reducer should increment step by a value`, () => {
    expect(reducer({
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

    expect(reducer({
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
    expect(reducer({
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

    expect(reducer({
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

  it(`Reducer should increment mistakes using action`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, ActionCreator.incrementMistakes())
    ).toEqual({
      step: -1,
      mistakes: 1,
    });
  });

  it(`Reducer should increment step using action`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, ActionCreator.incrementStep())
    ).toEqual({
      step: 0,
      mistakes: 0,
    });
  });
});
