import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ token, trackUri }) => {
  return (
    <SpotifyPlayer
      token={token}
      uris={trackUri ? [trackUri] : []}
      autoPlay={true}
    />
  );
};

export default Player;