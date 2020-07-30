import * as React from 'react';
import {mount} from 'enzyme';
import withAudio from './with-audio';

interface Props {
  children: React.ReactNode;
  onPlayButtonClick: () => void;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {onPlayButtonClick, children} = props;

  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`withAudioPlayer e2e suite`, () => {
  it(`withAudioPlayer button changes play/pause state`, () => {
    const onPlayButtonClickMock = jest.fn();
    const defaultPlaying = false;

    const pauseStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => null);

    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => null);

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
    expect(playStub).toHaveBeenCalled();
    expect(onPlayButtonClickMock.mock.calls.length).toBe(2);
  });
});
