import * as React from 'react';
import * as renderer from 'react-test-renderer';
import GameWinScreen from './game-win-screen';
import {BrowserRouter} from 'react-router-dom';

describe(`<GameWinScreen /> render suit`, () => {
  it(`<GameWinScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <GameWinScreen
            onReplayButtonClick={() => null}
            answeredQuestionsCount={2}
            mistakesCount={2}
          />
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
