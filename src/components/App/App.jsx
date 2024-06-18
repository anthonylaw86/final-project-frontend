import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import viteLogo from "/vite.svg";
import "./App.css";

// components
import Header from "../Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
        </div>
      </div>
    </>
  );
}

export default App;
