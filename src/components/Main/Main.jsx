import "./Main.css";
import Header from "../Header/Header";
import Player from "../Player/Player";

function Main({}) {
  return (
    <div>
      <Header />
      <div className="main__content-container">
        <p className="main__greeting">March to the beat of your own drum...</p>
        <p className="main__greeting-summary">
          This is your place to listen to music, add, like & share what has you
          up & moving today.
        </p>
        <Player />
      </div>
    </div>
  );
}

export default Main;
