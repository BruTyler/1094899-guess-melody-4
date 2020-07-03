import React from 'react';
import renderer from 'react-test-renderer';
import GameWinScreen from './game-win-screen.jsx';

describe(`<GameWinScreen /> render suit`, () => {
  it(`<GameWinScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <GameWinScreen
          onReplayButtonClick={() => {}}
          answeredQuestionsCount={2}
          mistakesCount={2}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
