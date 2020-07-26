import React from 'react';
import renderer from 'react-test-renderer';
import GameWinScreen from './game-win-screen';
import {BrowserRouter} from 'react-router-dom';

describe(`<GameWinScreen /> render suit`, () => {
  it(`<GameWinScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <GameWinScreen
            onReplayButtonClick={() => {}}
            answeredQuestionsCount={2}
            mistakesCount={2}
          />
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
