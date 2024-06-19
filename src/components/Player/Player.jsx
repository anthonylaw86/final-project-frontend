import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./Player.css";

const Player = ({ token, trackUri }) => {
  return (
    <SpotifyPlayer
      token={token}
      uris={trackUri ? [trackUri] : []}
      autoPlay={true}
      className="music-player"
    />
  );
};

export default Player;
