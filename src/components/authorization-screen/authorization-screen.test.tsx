import React from 'react';
import renderer from 'react-test-renderer';
import AuthorizationScreen from './authorization-screen';
import {BrowserRouter} from 'react-router-dom';

describe(`<AuthorizationScreen /> render suit`, () => {
  it(`<AuthorizationScreen /> render case`, () => {
    const generatedTree = renderer.create(
        <BrowserRouter>
          <AuthorizationScreen
            onLoginSubmit={() => {}}
            onReplayButtonClick={() => {}}
          />
        </BrowserRouter>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
