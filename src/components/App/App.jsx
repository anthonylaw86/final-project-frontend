import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import viteLogo from "/vite.svg";
import "./App.css";

// components
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Main />
          <About />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
