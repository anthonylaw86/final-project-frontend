import "./ItemCard.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, loggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  // const currentUser = useContext(CurrentUserContext);
  // console.log(item);

  // function onLike() {
  //   onCardLike({
  //     id: item._id,
  //     isLiked: isLiked,
  //     currentUser: currentUser,
  //   });
  // }

  return (
    <li className="card__container">
      <div className="card">
        <div className="card__name-container">
          <h2 className="card__name">{item.name}</h2>
        </div>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.albumUrl}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
