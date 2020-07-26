import React from 'react';
import renderer from 'react-test-renderer';
import QuestionArtistScreen from './question-artist-screen';

const EMPTY_HANDLER = () => {};
const QUESTION = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `src/url`,
  },
  answers: [{
    picture: `picture/url/1`,
    artist: `John Snow`,
  }, {
    picture: `picture/url/2`,
    artist: `Jack Daniels`,
  }, {
    picture: `picture/url/3`,
    artist: `Jim Beam`,
  }],
};

describe(`QuestionArtistScreen render suit`, () => {
  it(`QuestionArtistScreen render case`, () => {
    const generatedTree = renderer.create(
        <QuestionArtistScreen
          onAnswer={EMPTY_HANDLER}
          renderPlayer={EMPTY_HANDLER}
          question={QUESTION}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
