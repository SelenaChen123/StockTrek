import React, { useState } from "react";
import Card from "./components/Card.js";
import './styles/Register.css';
import { Link } from "react-router-dom";


function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
  }

  return (
    <div className="Register">
      <Card width="800px">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input type="text" value={username} onChange={(event) => setUserName(event.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />

          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />

          <button type="submit">Submit</button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
