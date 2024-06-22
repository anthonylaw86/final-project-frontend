import "./Header.css";
import MusicEmoji from "../../assets/musicemoji.png";

import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleLoginModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
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
          <>
            <button
              onClick={handleLoginModal}
              type="button"
              className="header-button"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser?.name}</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
