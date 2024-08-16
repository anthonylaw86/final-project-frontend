import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function RedirectPage({ setLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    const getCodeFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get("token");
    };
    const token = getCodeFromURL();
    if (token) {
      navigate("/profile");
      setLoggedIn(true);
      localStorage.setItem("authCode", token);
      // auth
      //   .getCurrentUser(token)
      //   .then((user) => {
      //     setCurrentUser(user);
      //     setLoggedIn(true);
      //     navigate("/profile");
      //   })
      //   .catch((err) => {
      //     console.log("Error retrieving user data", err);
      //   });
    }
  }, [navigate, setLoggedIn, setCurrentUser]);

  return null;
}

export default RedirectPage;
