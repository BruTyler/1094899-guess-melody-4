import * as React from 'react';
import * as renderer from 'react-test-renderer';
import GameOverScreen from './game-over-screen';
import {BrowserRouter} from 'react-router-dom';

describe(`<GameOverScreen /> render suit`, () => {
  it(`<GameOverScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <GameOverScreen
            onReplayButtonClick={() => null}
          />
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
