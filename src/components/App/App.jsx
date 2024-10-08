import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RedirectPage from "../RedirectPage/RedirectPage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

// Contexts & Constants
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Utils
import * as auth from "../../utils/auth";
import api from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [musicCards, setMusicCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Modal Handlers
  const toggleModal = (modalType = "") => setActiveModal(modalType);

  const handleAddClick = () => toggleModal("add-music");
  const handleLoginModal = () => toggleModal("login");
  const handleSignUpModal = () => toggleModal("signup");
  const closeActiveModal = () => toggleModal();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Item Handlers
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        closeActiveModal();
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddItemSubmit = ({ name, artist, albumUrl }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return api
        .addNewMusicItems({ name, artist, albumUrl }, token)
        .then((data) => {
          setMusicCards([data, ...musicCards]);
          console.log(musicCards);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteCard = (cardId) => {
    console.log("delete request for card id", cardId);

    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("JWT token not found in localStorage");
      return;
    }

    const makeRequest = () => {
      return api
        .deleteMusicItem(cardId, token)
        .then(() => {
          setMusicCards((cards) => cards.filter((x) => x._id !== cardId));
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    };

    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addLike(id, token)
          .then((updatedCard) => {
            setMusicCards((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeLike(id, token)
          .then((updatedCard) => {
            setMusicCards((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // Authorization Handlers
  const authenticateUser = (makeRequest, userInfo) => {
    handleSubmit(() =>
      makeRequest(userInfo).then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(userInfo);
        setLoggedIn(true);
        closeActiveModal();
      })
    );
  };

  const handleSignUp = (userInfo) => authenticateUser(auth.signUp, userInfo);
  const handleLogin = (userInfo) => authenticateUser(auth.signIn, userInfo);

  // useEffect's
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("jwt");

    if (storedUser) setCurrentUser(storedUser);

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.error("Token verification failed: ", err);
          setLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    api
      .getMusicItems()
      .then(setMusicCards)
      .catch((error) => {
        console.error("Error fetching music items", error);
      });
  }, []);

  useEffect(() => {
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
                    currentUser={currentUser}
                    handleLoginModal={handleLoginModal}
                    handleSignUpModal={handleSignUpModal}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      handleLoginModal={handleLoginModal}
                      handleSignUpModal={handleSignUpModal}
                      onCardClick={handleCardClick}
                      cards={musicCards}
                      onCardDelete={handleDeleteCard}
                      handleAddClick={handleAddClick}
                      loggedIn={loggedIn}
                      onCardLike={handleCardLike}
                      setLoggedIn={setLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-login"
                element={
                  <RedirectPage
                    setLoggedIn={setLoggedIn}
                    setCurrentUser={setCurrentUser}
                  />
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
          onSubmit={handleAddItemSubmit}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onCardDelete={handleDeleteCard}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
