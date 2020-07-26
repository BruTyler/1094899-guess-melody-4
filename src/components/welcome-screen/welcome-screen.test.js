import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

const ERROR = 2;
const CLICKHANDLER = () => {};

describe(`WelcomeScreen render suit`, () => {
  it(`WelcomeScreen render case`, () => {
    const generatedTree = renderer.create(
        <WelcomeScreen
          error={ERROR}
          onWelcomeButtonClick={CLICKHANDLER}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
