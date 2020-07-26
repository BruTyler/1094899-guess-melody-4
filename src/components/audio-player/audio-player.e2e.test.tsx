import React from 'react';
import {mount} from 'enzyme';
import AudioPlayer from './audio-player';

describe(`<AudioPlayer /> e2e suite`, () => {
  it(`<AudioPlayer /> button play/stop is pressed`, () => {
    const onPlayButtonClickMock = jest.fn();

    const audioPlayer = mount(
        <AudioPlayer
          src={`url`}
          isPlaying={false}
          isLoading={false}
          onPlayButtonClick={onPlayButtonClickMock}
        >
          <audio />
        </AudioPlayer>
    );

    const playButton = audioPlayer.find(`button.track__button`);
    playButton.simulate(`click`);
    playButton.simulate(`click`);

    expect(onPlayButtonClickMock.mock.calls.length).toBe(2);
  });
});
