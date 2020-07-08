import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen';

describe(`<AuthorizationScreen /> render suit`, () => {
  it(`<AuthorizationScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <AuthorizationScreen
          onReplayButtonClick={() => {}}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
