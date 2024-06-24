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
  const currentUser = useContext(
    CurrentUserContext || { id: 1, name: "Test User" }
  );

  console.log("cards", cards);

  console.log("currentUser", currentUser);

  const userCards = cards.filter(
    (item) => item.owner && item.owner.id === currentUser
  );

  console.log("Filtered userCards:", userCards);

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
        {cards.map((item) => {
          return (
            <ItemCard
              key={item.id}
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
