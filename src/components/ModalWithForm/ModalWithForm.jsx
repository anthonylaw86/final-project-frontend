import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  spanText,
  orModal,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"} `}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close_image" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button
              type="submit"
              className="modal__submit modal__submit-disabled"
            >
              <p className="modal__submit_text">{buttonText} </p>
            </button>
            <button
              type="button"
              className="modal__button-or"
              onClick={orModal}
            >
              {spanText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
