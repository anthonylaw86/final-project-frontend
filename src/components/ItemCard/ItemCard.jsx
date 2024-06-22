import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeIcon from "../../assets/likeIcon.svg";
import likeIconFilled from "../../assets/likeIconFilled.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, loggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  function onLike() {
    onCardLike({
      id: item._id,
      isLiked: isLiked,
      currentUser: currentUser,
    });
  }

  return (
    <li className="card__container">
      <div className="card">
        <div className="card__name-container">
          <h2 className="card__name">{item.name}</h2>
          {loggedIn ? (
            <button
              className="card__like-button"
              onClick={() => onLike(item._id, isLiked)}
            >
              <img
                src={isLiked ? likeIconFilled : likeIcon}
                alt="like button"
                className="card__like-button_img"
              />
            </button>
          ) : (
            ""
          )}
        </div>
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
    </li>
  );
}

export default ItemCard;
