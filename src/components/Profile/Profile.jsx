import "./Profile.css";
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

}) {
  return (
    <div className="profile">
      <Header setLoggedIn={setLoggedIn} handleLoginModal={handleLoginModal} />
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
