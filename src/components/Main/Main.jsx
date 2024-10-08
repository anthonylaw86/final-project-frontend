import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import About from "../About/About";

function Main({ handleLoginModal, handleSignUpModal, loggedIn, currentUser }) {
  return (
    <div>
      <Header
        handleLoginModal={handleLoginModal}
        loggedIn={loggedIn}
        handleSignUpModal={handleSignUpModal}
        currentUser={currentUser}
      />
      <div className="main__content-container">
        <p className="main__greeting">March to the beat of your own drum...</p>
        <p className="main__greeting-summary">
          This is your place to listen to music, add, like & share what has you
          up & moving today.
        </p>

        <About />
      </div>
    </div>
  );
}

export default Main;
