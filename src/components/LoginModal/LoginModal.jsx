import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  onClose,
  isOpen,
  handleLogin,
  handleSignUpModal,
  buttonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
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
        Email
        <input
          type="email"
          name="email"
          value={email}
          minLength="2"
          maxLength="40"
          placeholder="Email"
          className="modal__input"
          onChange={handleEmailChange}
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
