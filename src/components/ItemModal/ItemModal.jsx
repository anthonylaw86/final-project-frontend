import "./ItemModal.css";
import close from "../../assets/close.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onCardDelete }) {
  const handleDeleteCard = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"} `}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close_image" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__song">{card.name}</h2>
          <p className="modal__artist">{card.artist}</p>
        </div>
        {isOwn ? (
          <button
            type="text"
            className="modal__button"
            onClick={handleDeleteCard}
          >
            Delete Song
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ItemModal;
