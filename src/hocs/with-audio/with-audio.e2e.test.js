import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import withAudio from './with-audio.jsx';

const MockComponent = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`withAudioPlayer e2e suite`, () => {
  it(`withAudioPlayer button changes play state`, () => {
    const onPlayButtonClickMock = jest.fn();
    const defaultPlaying = false;

    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});

    /*
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {}); */

    const audioPlayer = mount(
        <MockComponentWrapped
          src={`url`}
          isPlaying={defaultPlaying}
          onPlayButtonClick={onPlayButtonClickMock}
        >
          <audio />
        </MockComponentWrapped>
    );

    audioPlayer.instance().componentDidMount();

    expect(audioPlayer.state(`isPlaying`)).toEqual(defaultPlaying);

    const playButton = audioPlayer.find(`button`);
    playButton.simulate(`click`);

    expect(audioPlayer.state(`isPlaying`)).toEqual(!defaultPlaying);

    playButton.simulate(`click`);
    expect(audioPlayer.state(`isPlaying`)).toEqual(defaultPlaying);

    expect(pauseStub).toHaveBeenCalled();
    // expect(playStub).toHaveBeenCalled();
    expect(onPlayButtonClickMock.mock.calls.length).toBe(2);
  });
});
