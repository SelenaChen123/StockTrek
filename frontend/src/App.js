import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function App() {

  return (
    <div className="App">
      <Home />
    </div >
  );
}

export default App;
