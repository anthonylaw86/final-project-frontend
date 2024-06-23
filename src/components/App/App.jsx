import "./App.css";
import React from "react";

// Hooks and Routes
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";

// Contexts & Constants
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import defaultMusicCards from "../../../constants/defaultMusicCards";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [musicCards, setMusicCards] = useState(defaultMusicCards);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);
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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-music");
  };

  // Item Handlers
  const handleSubmit = (e) => {
    setIsLoading(false);
    closeActiveModal();
  };

  const handleAddItemSubmit = ({ name, artist, albumUrl }) => {
    const addNewMusicItem = ({ name, artist, albumUrl }) => {
      const newItem = {
        id: Date.now(),
        name,
        artist,
        albumUrl,
      };
      setMusicCards([newItem, ...musicCards]);
    };

    handleSubmit(() => addNewMusicItem({ name, artist, albumUrl }));
  };

  // Authorization Handlers
  const handleSignUp = ({ email, password, username }) => {
    const makeRequest = () => {
      setCurrentUser({ email, password, username });
      setIsLoading(true);
      setLoggedIn(true);
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      handleLoginModal({ email, password });
      setLoggedIn(true);
    };
    handleSubmit(makeRequest);
  };

  // useEffect's
  // useEffect(() => {
  //   setCurrentUser({ name: "anthony" });
  //   setIsLoggedIn(!!currentUser);

  // });

  useEffect(() => {
    if (!activeModal) return;

    const handleEscapeClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    handleLoginModal={handleLoginModal}
                    handleSignUpModal={handleSignUpModal}
                    onCardClick={handleCardClick}
                    cards={musicCards}
                    // onCardDelete={handleDeleteCard}
                    handleAddClick={handleAddClick}
                    loggedIn={loggedIn}
                    // onCardLike={handleCardLike}
                    setLoggedIn={setLoggedIn}
                  />
                  // </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
        </div>

        <RegisterModal
          isOpen={activeModal === "signup"}
          onClose={closeActiveModal}
          handleLoginModal={handleLoginModal}
          handleSignUp={handleSignUp}
          buttonText={isLoading ? "Saving..." : "Sign Up"}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          handleSignUpModal={handleSignUpModal}
          handleLogin={handleLogin}
          buttonText={isLoading ? "Saving..." : "Log In"}
        />

        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-music"}
          onAddItem={handleAddItemSubmit}
          buttonText={isLoading ? "Saving..." : "Add Song"}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          // onCardDelete={handleDeleteCard}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
