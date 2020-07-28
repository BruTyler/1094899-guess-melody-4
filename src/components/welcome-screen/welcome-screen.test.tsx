import * as React from 'react';
import * as renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';


describe(`WelcomeScreen render suit`, () => {
  it(`WelcomeScreen render case`, () => {
    const generatedTree = renderer.create(
        <WelcomeScreen
          error={2}
          onWelcomeButtonClick={() => null}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
