import "./App.css";
import React from "react";

// Hooks and Routes
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RedirectPage from "../RedirectPage/RedirectPage";

// Contexts & Constants
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import defaultMusicCards from "../../../constants/defaultMusicCards";

// Utils
import * as auth from "../../utils/auth";
import api from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [musicCards, setMusicCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  // console.log("Deleting card with ID:", cardId);

  // setMusicCards((prevCards) => {
  //   console.log(cardId);
  //   console.log("Original cards: ", prevCards);
  //   const updatedCards = prevCards.filter((card) => card.id !== cardId);
  //   console.log("Updated cards: ", updatedCards);
  //   return updatedCards;
  // });

  // closeActiveModal();
  // };

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
  const handleSignUp = ({ email, password, username }) => {
    setIsLoading(false);
    const makeRequest = () => {
      return auth.signUp({ email, password, username }).then((res) => {
        console.log(res.message);

        console.log(currentUser);
        setCurrentUser({ email, password, username });
        handleLogin({ username, password });
        closeActiveModal();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ username, password }) => {
    const makeRequest = () => {
      return auth
        .signIn({ username, password })
        .then((res1) => {
          console.log(res1);
          localStorage.setItem("jwt", res1.token);

          return auth.getCurrentUser(res1.token);
        })
        .then((res2) => {
          console.log(res2);
          handleLoginModal(res2.user);
          setLoggedIn(true);
          setCurrentUser({ username, password });
        });
    };
    handleSubmit(makeRequest);
  };

  // useEffect's
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    api
      .getMusicItems()
      .then((items) => {
        setMusicCards(items);
      })
      .catch((res) => {
        console.log(`Error: ${res}`);
      });
  }, []);

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
  console.log(currentUser);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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
                    isLoggedIn={isLoggedIn}
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
                      isLoggedIn={isLoggedIn}
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
