import "./Header.css";
import NewsExplorer from "../../assets/NewsExplorer.svg";

import { Link } from "react-router-dom";

function Header({}) {
  return (
    <header className="header">
      <div>
        <Link to="/" className="header__link">
          <p className="header__logo">Hit me with that BEAT!</p>
        </Link>
      </div>

      <div className="header__button-container">
        <Link to="/" className="header__link">
          <p className="header__home-link">Home</p>
        </Link>
        <button type="button" className="header-button">
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
