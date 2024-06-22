import ItemCard from "../ItemCard/ItemCard";
import "./CardSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function CardSection({
  onCardClick,
  cards,
  handleAddClick,
  loggedIn,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userCards = cards.filter((item) => item.owner === currentUser._id);

  return (
    <div className="card-section">
      <div className="card-section-header">
        <p className="card-section-text">What's on your fav's</p>
        <button className="card-section-button" onClick={handleAddClick}>
          {" "}
          Add Song
        </button>
      </div>
      <ul className="card-section__items">
        {userCards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              loggedIn={loggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CardSection;
