import { useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  const [showRegister, setShowRegister] = useState(true);

  const handleToggle = () => {
    setShowRegister(!showRegister);
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
