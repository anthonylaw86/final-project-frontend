import React, { useState, useEffect } from "react";

import "./Main.css";

import SpotifyLogin from "../SpotifyLogin/SpotifyLogin";
import WebPlayback from "../WebPlayback/WebPlayback";
import Header from "../Header/Header";
import Player from "../Player/Player";
import About from "../About/About";

function Main({ handleLoginModal, handleSignUpModal, loggedIn }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
  }, []);

  return (
    <div>
      <Header
        handleLoginModal={handleLoginModal}
        isLoggedIn={loggedIn}
        handleSignUpModal={handleSignUpModal}
      />
      <div className="main__content-container">
        <p className="main__greeting">March to the beat of your own drum...</p>
        <p className="main__greeting-summary">
          This is your place to listen to music, add, like & share what has you
          up & moving today.
        </p>
        {/* <Player /> */}
        <>{token === "" ? <SpotifyLogin /> : <WebPlayback token={token} />}</>
        <About />
      </div>
    </div>
  );
}

export default Main;
