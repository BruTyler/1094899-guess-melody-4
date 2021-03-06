import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Mistakes from './mistakes';

describe(`Mistakes render suit`, () => {
  it(`Mistakes render case`, () => {
    const generatedTree = renderer.create(
        <Mistakes count={3}/>
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
