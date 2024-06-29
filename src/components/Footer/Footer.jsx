import "./Footer.css";

import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";

function Footer({}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        &#169; {currentYear} Powered by Spotify API
      </p>

      <div className="footer__links">
        <div className="footer__buttons">
          <a
            href="https://github.com/anthonylaw86"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={github}
              alt="GitHub Icon"
              className="footer__icon-button"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/anthony-law-601360263/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedin}
              alt="LinkedIn Icon"
              className="footer__icon-button"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
