import React from 'react';
import renderer from 'react-test-renderer';
import GameOverScreen from './game-over-screen.jsx';
import {BrowserRouter} from 'react-router-dom';

describe(`<GameOverScreen /> render suit`, () => {
  it(`<GameOverScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <GameOverScreen
            onReplayButtonClick={() => {}}
          />
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
