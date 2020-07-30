import * as React from 'react';
import * as renderer from 'react-test-renderer';
import QuestionArtistScreen from './question-artist-screen';
import {QuestionArtist} from '../../types';
import {GameType} from '../../const';

const EMPTY_HANDLER = () => null;
const QUESTION: QuestionArtist = {
  type: GameType.ARTIST,
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
