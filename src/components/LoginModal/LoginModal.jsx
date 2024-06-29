import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  onClose,
  isOpen,
  handleLogin,
  handleSignUpModal,
  buttonText,
}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setUserName("");
      setPassword("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ username, password });
  }

  return (
    <ModalWithForm
      title="Login"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isOpen={isOpen}
      spanText="Or Sign Up"
      orModal={handleSignUpModal}
    >
      <label className="modal__label">
        User Name
        <input
          type="text"
          name="username"
          value={username}
          minLength="2"
          maxLength="40"
          placeholder="User Name"
          className="modal__input"
          onChange={handleUserNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="text"
          name="password"
          value={password}
          minLength="2"
          maxLength="40"
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
