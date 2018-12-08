import React, { Component } from "react";
import {
  VolumeOff,
  VolumeMute,
  VolumeDown,
  VolumeUp
} from "@material-ui/icons";
import PropTypes from "prop-types";

import Player from "./Player";

import { connect } from "react-redux";
import { pauseSong, playSong } from "../../store/actionCreators/player";
import { addUserSongs, removeUserSongs } from "../../store/actionCreators/user";

const VOLUME_ICON_SET = {
  VolumeOff: <VolumeOff />,
  VolumeMute: <VolumeMute />,
  VolumeDown: <VolumeDown />,
  VolumeUp: <VolumeUp />
};

export class PlayerContainer extends Component {
  state = {
    songDuration: 0,
    playingProgress: 0,
    volumeValue: 0.5,
    isMuted: false
  };

  static propTypes = {
    userSongs: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playSong: PropTypes.func.isRequired,
    pauseSong: PropTypes.func.isRequired,
    addUserSongs: PropTypes.func.isRequired,
    removeUserSongs: PropTypes.func.isRequired
  };

  getItems = () => {
    return [
      {
        name: "Legal info",
        handler: () => {}
      },
      {
        name: this.handleCheck(this.props.player.song.id),
        handler: this.handleOperation.bind(this, this.props.player.song.id)
      },
      {
        name: "Share",
        handler: this.handleShare.bind(this, this.props.player.song.id)
      }
    ];
  };

  handleCheck = songId => {
    if (
      this.props.userSongs.some(elem => {
        return elem.id === songId;
      })
    ) {
      return "Remove from my songs";
    }
    return "Add to my songs";
  };

  handleOperation = songId => {
    if (
      this.props.userSongs.some(elem => {
        return songId === elem.id;
      })
    ) {
      this.props.removeUserSongs(this.props.auth.user.uid, songId);
    } else {
      this.props.addUserSongs(this.props.auth.user.uid, songId);
    }
  };

  handleShare = songId => {
    window.open(`/songs/${songId}`);
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setPlayingState();
    }
  }

  addListeners = () => {
    this.audio.addEventListener("play", this.handlePlay);
    this.audio.addEventListener("timeupdate", this.handlePlay);
  };

  removeListeners = () => {
    this.audio.removeEventListener("play", this.handlePlay);
    this.audio.removeEventListener("timeupdate", this.handlePlay);
  };

  handleChangePlayingState = () => {
    if (this.props.player.isPlaying) {
      this.props.pauseSong(this.props.player.song);
    } else {
      this.props.playSong(this.props.player.song);
    }
    this.setPlayingState();
  };

  handleChangeProgress = (event, value) => {
    this.setState({ playingProgress: value });
  };

  handleChangeProgressStart = () => {
    this.removeListeners();
  };

  handleChangeProgressEnd = () => {
    this.addListeners();
    this.audio.currentTime =
      (this.state.songDuration / 100) * this.state.playingProgress;
  };

  setPlayingState = () => {
    const { isPlaying } = this.props.player;

    if (!isPlaying) {
      this.audio.pause();
      return;
    }

    this.audio.play();
  };

  handlePlay = ({ target }) => {
    const { currentTime, duration } = target;
    const currentProgress = ((currentTime / duration) * 100).toFixed(2);

    this.setState({
      songDuration: duration,
      playingProgress: Number(currentProgress)
    });

    if (this.state.playingProgress === 100) {
      this.setState({
        playingProgress: 0
      });
      this.props.pauseSong(this.props.player.song);
    }
  };

  handleChangeVolume = (event, value) => {
    const volume = Number(value.toFixed(1));

    this.setState({ volumeValue: volume, isMuted: volume === 0 });
    this.audio.volume = volume;
  };

  handleMute = () => {
    this.setState(prevState => {
      const isMuted = !prevState.isMuted;
      const volume = prevState.volumeValue || 0.5;
      this.audio.volume = isMuted ? 0 : volume;
      return { isMuted, volumeValue: volume };
    });
  };

  getVolumeIcon = volume => {
    if (volume >= 0.1 && volume < 0.4) {
      return VOLUME_ICON_SET.VolumeMute;
    } else if (volume >= 0.4 && volume < 0.7) {
      return VOLUME_ICON_SET.VolumeDown;
    } else if (volume >= 0.7 && volume <= 1) {
      return VOLUME_ICON_SET.VolumeUp;
    } else {
      return VOLUME_ICON_SET.VolumeOff;
    }
  };

  render() {
    const { playingProgress, volumeValue, isMuted } = this.state;
    const { song } = this.props.player;
    const volume = isMuted ? 0 : volumeValue;

    return (
      <>
        <audio src={song.songURL} ref={element => (this.audio = element)} />
        <Player
          items={this.getItems.call(this)}
          onPlay={this.handleChangePlayingState}
          onChangeProgress={this.handleChangeProgress}
          progress={playingProgress}
          song={song}
          volume={volume}
          volumeIcon={this.getVolumeIcon(volume)}
          onChangeVolume={this.handleChangeVolume}
          onMute={this.handleMute}
          onChangeProgressStart={this.handleChangeProgressStart}
          onChangeProgressEnd={this.handleChangeProgressEnd}
          player={this.props.player}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
    userSongs: state.userSongs,
    auth: state.auth
  };
}

const mapDispatchToProps = {
  playSong,
  pauseSong,
  addUserSongs,
  removeUserSongs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainer);
