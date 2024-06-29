import "./Profile.css";

import { useEffect, useState } from "react";

import Header from "../Header/Header";
import CardSection from "../CardSection/CardSection";
import SpotifyLogin from "../SpotifyLogin/SpotifyLogin";
import WebPlayback from "../WebPlayback/WebPlayback";

function Profile({
  onCardClick,
  cards,
  handleAddClick,
  setLoggedIn,
  loggedIn,
  onCardLike,
  handleLoginModal,
  handleSignUpModal,
}) {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
  }, []);

  useEffect(() => {
    console.log("Cards:", cards);
  }, [cards]);

  return (
    <div className="profile">
      <Header
        setLoggedIn={setLoggedIn}
        handleLoginModal={handleLoginModal}
        isLoggedIn={loggedIn}
        handleSignUpModal={handleSignUpModal}
      />
      <>
        {token === "" ? (
          <SpotifyLogin  />
        ) : (
          <WebPlayback token={token}  />
        )}
      </>
      <CardSection
        onCardClick={onCardClick}
        cards={cards}
        handleAddClick={handleAddClick}
        loggedIn={loggedIn}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
