import { useState } from "react";
import './styles/App.css';
import Register from './register';
import Login from './login';

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
      {/* <Login /> */}
    </div>
  );
}

export default App;
