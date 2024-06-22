import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";

const AddItemModal = ({ onAddItem, isOpen, onClose, buttonText }) => {
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
      setValues({ songName: "", songAlbum: "", albumUrl: "" });
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
        Song Name{" "}
        <input
          type="text"
          className="modal__input"
          id="songName"
          placeholder="Song Name"
          value={values.songName}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
          name="songName"
        />
      </label>
      <label className="modal__label">
        Song Album{" "}
        <input
          type="text"
          className="modal__input"
          id="songAlbum"
          placeholder="Song Album"
          value={values.songAlbum}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
          name="songAlbum"
        />
      </label>
      <label className="modal__label">
        Album Url{" "}
        <input
          type="url"
          className="modal__input"
          id="albumUrl"
          placeholder="Album Url"
          value={values.albumUrl}
          onChange={handleChange}
          required
          name="songName"
        />
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
