import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

const TIME = 100;
const ERROR = 2;
const CLICKHANDLER = () => {};

describe(`WelcomeScreen render suit`, () => {
  it(`WelcomeScreen render case`, () => {
    const generatedTree = renderer.create(
        <WelcomeScreen
          time={TIME}
          error={ERROR}
          onWelcomeButtonClick={CLICKHANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
