import React from "react";
import "./SpotifyLogin.css"

function SpotifyLogin() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="btn-spotify" href="http://localhost:3001/auth/login">
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default SpotifyLogin;
