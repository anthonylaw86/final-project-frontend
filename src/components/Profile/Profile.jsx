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
  useEffect(() => {
    console.log("Cards:", cards);
  }, [cards]);

  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch("http://localhost:3002/auth/token", {
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

  return (
    <div className="profile">
      <Header
        setLoggedIn={setLoggedIn}
        handleLoginModal={handleLoginModal}
        isLoggedIn={loggedIn}
        handleSignUpModal={handleSignUpModal}
      />

      <CardSection
        onCardClick={onCardClick}
        cards={cards}
        handleAddClick={handleAddClick}
        loggedIn={loggedIn}
        onCardLike={onCardLike}
      />

      {
        <div className="spotify">
          {token === "" ? <SpotifyLogin /> : <WebPlayback token={token} />}
        </div>
      }
    </div>
  );
}

export default Profile;
