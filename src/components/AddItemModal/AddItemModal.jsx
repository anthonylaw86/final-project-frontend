import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, isOpen, onClose, buttonText, onSubmit }) => {
  const { values, handleChange, setValues } = useForm({
    songName: "",
    songAlbum: "",
    albumUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", artist: "", albumUrl: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="New Music"
      buttonText={buttonText}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={"" || values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
          name="name"
        />
      </label>
      <label className="modal__label">
        Artist{" "}
        <input
          type="text"
          className="modal__input"
          id="artist"
          placeholder="Artist"
          value={"" || values.artist}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
          name="artist"
        />
      </label>
      <label className="modal__label">
        Album URL{" "}
        <input
          type="url"
          className="modal__input"
          id="albumUrl"
          placeholder="Album URL"
          value={"" || values.albumUrl}
          onChange={handleChange}
          required
          name="albumUrl"
        />
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
