import "./App.css";
import React from "react";

// Hooks and Routes
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// components
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("login");
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  // Modal Handlers

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleLoginModal={handleLoginModal}
                  handleSignUpModal={handleSignUpModal}
                  isLoggedIn={loggedIn}
                />
              }
            />
          </Routes>
          <About />
          <Footer />
        </div>
      </div>

      <RegisterModal
        isOpen={activeModal === "signup"}
        onClose={closeActiveModal}
        handleLoginModal={handleLoginModal}
        buttonText={isLoading ? "Saving..." : "Sign Up"}
      />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        handleSignUpModal={handleSignUpModal}
        buttonText={isLoading ? "Saving..." : "Log In"}
      />
    </>
  );
}

export default App;
