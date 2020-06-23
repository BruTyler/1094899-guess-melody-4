import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen.jsx';
import {GameType} from "../../const.js";

const CHILDREN_COMPONENT = <div>test</div>;
const GAME_TYPE = GameType.ARTIST;

describe(`<GameScreen /> render suit`, () => {
  it(`<GameScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <GameScreen gameType={GAME_TYPE}>
          {CHILDREN_COMPONENT}
        </GameScreen>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
