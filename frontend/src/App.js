import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [showRegister, setShowRegister] = useState(true);

  const handleToggle = () => {
    setShowRegister(!showRegister);
  }

  return (
    <div className="App">
      {/* {showRegister ? (
        <Register onToggle={handleToggle} />
      ) : (
        <Login onToggle={handleToggle} />
      )} */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Home />
    </div >
  );
}

export default App;
