import React from 'react';
import renderer from 'react-test-renderer';

import {GameScreen} from './game-screen.jsx';
import {GameType} from '../../const.js';

const CHILDREN_MARKUP = <div>test</div>;
const GAME_TYPE = GameType.ARTIST;

describe(`<GameScreen /> render suit`, () => {
  it(`<GameScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <GameScreen
          gameType={GAME_TYPE}
          mistakes={3}>
          {CHILDREN_MARKUP}
        </GameScreen>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
