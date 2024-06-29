import "./Header.css";

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import MusicEmoji from "../../assets/musicemoji.png";

function Header({ handleLoginModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("header current user", currentUser);

  return (
    <div className="header__container">
      <header className="header">
        <div>
          <Link to="/" className="header__link">
            <img src={MusicEmoji} alt="music emoji" className="header__emoji" />
            <p className="header__logo">gimme a beat</p>
          </Link>
        </div>
        <div className="header__button-container">
          <Link to="/" className="header__link">
            <p className="header__home-link">Home</p>
          </Link>
          {isLoggedIn ? (
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser?.username}</p>
            </Link>
          ) : (
            <button
              onClick={handleLoginModal}
              type="button"
              className="header-button"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
