import React from 'react';
import renderer from 'react-test-renderer';
import GameOverScreen from './game-over-screen.jsx';

describe(`<GameOverScreen /> render suit`, () => {
  it(`<GameOverScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <GameOverScreen
          onReplayButtonClick={() => {}}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
