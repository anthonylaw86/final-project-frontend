import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({
  onClose,
  isOpen,
  handleSignUp,
  handleLoginModal,
  buttonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp({ email, password, username });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Signup"
      buttonText={buttonText}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      orModal={handleLoginModal}
      spanText="Or Log In"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          minLength="2"
          maxLength="40"
          required
        />
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          className="modal__input"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
