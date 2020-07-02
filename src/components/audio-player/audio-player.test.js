import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';

const CLICKHANDLER = () => {};
const QUESTION_ARTIST = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

describe(`<AudioPlayer /> render suit`, () => {
  it(`<AudioPlayer /> render case`, () => {
    const generatedTree = renderer.create(
        <AudioPlayer
          src={QUESTION_ARTIST.song.src}
          isPlaying={true}
          isLoading={false}
          onPlayButtonClick={CLICKHANDLER}
        >
          <audio />
        </AudioPlayer>,
        {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
