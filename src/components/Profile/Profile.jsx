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
    const getToken = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const text = await response.text();

        // Attempt to parse JSON
        let json;
        try {
          json = JSON.parse(text);
        } catch (error) {
          console.error("Response is not valid JSON:", text);
          throw new Error("Invalid JSON response");
        }

        setToken(json.access_token);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };

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
      <>{token === "" ? <SpotifyLogin /> : <WebPlayback token={token} />}</>
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
