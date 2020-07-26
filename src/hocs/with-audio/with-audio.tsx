import * as React from 'react';

interface Props {
  isPlaying: boolean;
  onPlayButtonClick: () => void;
  src: string;
}

interface State {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
}

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent<Props, State>  {
    private _audioRef: React.RefObject<HTMLAudioElement>;
    
    constructor(props: Props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime)
      });
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.isPlaying !== this.state.isPlaying) {
        this.setState({
          isPlaying: nextProps.isPlaying,
        });
      }
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;
      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    render() {
      const {isLoading, isPlaying} = this.state;
      const {onPlayButtonClick} = this.props;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        isLoading={isLoading}
        onPlayButtonClick={() => {
          this.setState({isPlaying: !isPlaying});
          onPlayButtonClick();
        }}
      >
        <audio
          ref={this._audioRef}
        />
      </Component>
      ;
    }
  }

  return WithAudio;
};

export default withAudio;
