import React from 'react';
import renderer from 'react-test-renderer';

import {GameScreen} from './game-screen';
import {GameType} from '../../const';
import {BrowserRouter} from 'react-router-dom';

const CHILDREN_MARKUP = <div>test</div>;
const GAME_TYPE = GameType.ARTIST;

describe(`<GameScreen /> render suit`, () => {
  it(`<GameScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <GameScreen
            gameType={GAME_TYPE}
            mistakes={3}
            goToWelcome={() => {}}
          >
            {CHILDREN_MARKUP}
          </GameScreen>
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
