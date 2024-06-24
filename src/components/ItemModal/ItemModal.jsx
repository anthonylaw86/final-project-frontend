import "./ItemModal.css";
import close from "../../assets/close.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, onCardDelete }) {
  const handleDeleteCard = (e) => {
    e.preventDefault();
    onCardDelete(card.id);
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"} `}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close_image" />
        </button>
        <img src={card.albumUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__song">{card.name}</h2>
          <p className="modal__artist">{card.artist}</p>
        </div>

        <button
          type="text"
          className="modal__button"
          onClick={handleDeleteCard}
        >
          Delete Song
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
