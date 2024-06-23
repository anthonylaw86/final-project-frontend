import "./Main.css";
import Header from "../Header/Header";
import Player from "../Player/Player";
import About from "../About/About";

function Main({ handleLoginModal, isLoggedIn }) {
  return (
    <div>
      <Header handleLoginModal={handleLoginModal} isLoggedIn={isLoggedIn} />
      <div className="main__content-container">
        <p className="main__greeting">March to the beat of your own drum...</p>
        <p className="main__greeting-summary">
          This is your place to listen to music, add, like & share what has you
          up & moving today.
        </p>
        <Player />
        <About />
      </div>
    </div>
  );
}

export default Main;
