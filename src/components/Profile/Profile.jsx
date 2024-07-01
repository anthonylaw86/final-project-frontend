import "./Profile.css";

import { useEffect } from "react";

import Header from "../Header/Header";
import CardSection from "../CardSection/CardSection";

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
    </div>
  );
}

export default Profile;
