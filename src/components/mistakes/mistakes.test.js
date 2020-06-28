import React from 'react';
import renderer from 'react-test-renderer';
import Mistakes from './mistakes.jsx';

describe(`Mistakes render suit`, () => {
  it(`Mistakes render case`, () => {
    const generatedTree = renderer.create(
        <Mistakes count={3}/>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
