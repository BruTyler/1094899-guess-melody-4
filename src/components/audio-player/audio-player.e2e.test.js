import React from 'react';
import {mount} from 'enzyme';
import AudioPlayer from './audio-player.jsx';

describe(`<AudioPlayer /> e2e suite`, () => {
  it(`<AudioPlayer /> button play/stop is pressed`, () => {
    const onPlayButtonClickMock = jest.fn();
    const defaultPlaying = false;

    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});

    const audioPlayer = mount(
        <AudioPlayer
          src={`url`}
          isPlaying={defaultPlaying}
          onPlayButtonClick={onPlayButtonClickMock}
        />
    );

    expect(audioPlayer.state(`isPlaying`)).toEqual(defaultPlaying);
    audioPlayer.setState({isLoading: false});

    const playButton = audioPlayer.find(`button.track__button`);

    playButton.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toEqual(!defaultPlaying);
    expect(pauseStub).toHaveBeenCalled();

    playButton.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toEqual(defaultPlaying);

    expect(onPlayButtonClickMock.mock.calls.length).toBe(2);
  });
});
