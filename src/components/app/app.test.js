import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const TIME = 100;
const ERROR = 2;

describe(`App render suit`, () => {
  it(`App render case`, () => {
    const generatedTree = renderer.create(
        <App
          gameTime={TIME}
          errorCount={ERROR}
        />
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
