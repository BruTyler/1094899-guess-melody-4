import * as React from 'react';

interface Props {
  src: string;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

const AudioPlayer: React.FunctionComponent<Props> = (props: Readonly<Props>) => {
  const {isLoading, isPlaying, onPlayButtonClick, children} = props;

  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {children}
      </div>
    </React.Fragment>
  );
};

export default AudioPlayer;
