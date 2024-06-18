import "./Header.css";

import { Link } from "react-router-dom";

function Header({}) {
  return (
    <header className="header">
      <h1 className="header__logo">NewsExplorer</h1>

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
